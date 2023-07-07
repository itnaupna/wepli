package com.bit.jwt;


import java.io.IOException;
import java.util.*;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bit.service.MemberService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;


// 인증에서 제외할 url
@Component
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final AntPathMatcher PATH_MATCHER = new AntPathMatcher();
	
	// 실제 JWT 검증을 실행하는 Provider
	@Autowired 
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MemberService ms;

    // 인증에서 제외할 url
    private static final List<String> EXCLUDE_URL = Collections.unmodifiableList(
        Arrays.asList(
            "/api/test",
            "/api/lv0/**"
        ));

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//         jwt cookie 사용 시 해당 코드를 사용하여 쿠키에서 토큰을 받아오도록 함
        String token = Arrays.stream(request.getCookies())
            .filter(c -> c.getName().equals("token"))
            .findFirst().map(Cookie::getValue)
            .orElse(null);
        log.info("token{}", token);

        String nick = null;
        String jwtToken = null;

        // Bearer token인 경우 JWT 토큰 유효성검사 진행
        if(token != null && token.startsWith("Bearer")) {
            jwtToken = token.substring(6);
            log.info("jwttoken{}", jwtToken);
            try {
                // token 디코딩 후 nick 추출
                nick = jwtTokenProvider.getUsernameFromToken(jwtToken);
            } catch (SignatureException e) {
				log.error("Invalid JWT signature: {}", e.getMessage());
			} catch (MalformedJwtException e) {
				log.error("Invalid JWT token: {}", e.getMessage());
			} catch (ExpiredJwtException e) {
				log.error("JWT token is expired: {}", e.getMessage());
			} catch (UnsupportedJwtException e) {
				log.error("JWT token is unsupported: {}", e.getMessage());
			} catch (IllegalArgumentException e) {
				log.error("JWT claims string is empty: {}", e.getMessage());
			}
        } else {
            logger.warn("JWT Token does not begin with Bearer String");
        }
        if(nick != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // db에서 메일, 문자 인증 받았는지 여부에 따라 권한 부여
            Map<String, Object> auth = ms.AuthLevelCheck(nick);

            String authValue = String .valueOf(auth.get("roles"));
//            GrantedAuthority authority = new SimpleGrantedAuthority(authValue);
            // List 타입인 이유는 권한이 여러개일수도 있어서
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(authValue));

            if(jwtTokenProvider.validateToken(jwtToken, auth)) {
                UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(auth.get("nick"), null, authorities);

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

        //  accessToken 인증 후 refreshToken 재발급이 필요한 경우 재발급
        try {
            if(nick != null) {
                jwtTokenProvider.reGenerateRefreshToken(nick);
            }
        }catch (Exception e) {
			log.error("[JwtRequestFilter] refreshToken 재발급 체크 중 문제 발생 : {}", e.getMessage());
		}

        filterChain.doFilter(request,response);
    }

    // Filter에서 제외할 URL 설정
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String servletPath = request.getServletPath();
		return EXCLUDE_URL.stream().anyMatch(pattern -> PATH_MATCHER.match(pattern, servletPath));
	}
}
