package com.bit.jwt;


import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bit.service.MemberService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;


// 인증에서 제외할 url
@Component
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {
	
	// 실제 JWT 검증을 실행하는 Provider
	@Autowired 
    private JwtTokenProvider jwtTokenProvider;

    // 인증에서 제외할 url
    private static final List<String> EXCLUD_URL = Collections.unmodifiableList(
        Arrays.asList(
            "/api/login",
            "/api/member",
            "/api/playlist/getList",
            "/api/playlist/getDetail",
            "/api/stage/getList",
            "/api/stage/getRoom"
        ));

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // jwt cookie 사용 시 해당 코드를 사용하여 쿠키에서 토큰을 받아오도록 함
        String token = Arrays.stream(request.getCookies())
            .filter(c -> c.getName().equals("wepli"))
            .findFirst() .map(Cookie::getValue)
            .orElse(null);

        String nick = null;
        String jwtToken = null;

        // Bearer token인 경우 JWT 토큰 유효성검사 진행
        if(token != null && token.startsWith("Bearer")) {
            jwtToken = token.substring(7);

            try {
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
            MemberService ms = new MemberService();
            Map<String, String> auth = ms.AuthLevelCheck(nick);
        }
        
    }

    
}
