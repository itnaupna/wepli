package com.bit.controller;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bit.dto.TokenDto;
import com.bit.jwt.JwtTokenProvider;
import com.bit.service.MemberService;
import com.bit.service.TokenService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
public class LoginController {
    // jwt 성공하면 가입시 token table에 nick insert하는것 의논 이유 -> login시
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    
    @Autowired
    MemberService memberService;

    @Autowired
    TokenService tokenService;

	@GetMapping("/lv1/auth1")
	public String auth1() {
		return "auth1";
	}

	@GetMapping("/lv2/auth2")
	public String auth2() {
		return "auth2";
	}
    // login 요청
    @PostMapping("/lv0/login")
    public Map<String, String> access(@RequestBody Map<String, String> emailPW, 
    HttpServletRequest request, HttpServletResponse response) throws Exception {
        // email, pw 맞으면 1 아니면 0
        int accessChk = memberService.Login(emailPW.get("email"), emailPW.get("pw"));
		log.info(String.valueOf(accessChk));
        Map<String, String> returnMap = new HashMap<>();
        if(accessChk == 0) {
            returnMap.put("result", "fail");
            return returnMap;
        } else {
            String nick = memberService.getNickName(emailPW.get("email"));
			log.info(nick);
            Map<String, Object> auth = memberService.AuthLevelCheck(nick);
			auth.remove("nick");
//			System.out.println(auth.get("roles"));
			// log.info(nick);

            // 토큰 생성
            Map<String, String> tokens = jwtTokenProvider.generateTokenSet(nick, auth);
            String accessToken = URLEncoder.encode(tokens.get("accessToken"), "utf-8");
		    String refreshToken = URLEncoder.encode(tokens.get("refreshToken"), "utf-8");


            log.info("[JWT 발급] accessToken : " + accessToken);
		    log.info("[JWT 발급] refreshToken : " + refreshToken);
			jwtTokenProvider.getUsernameFromToken(accessToken);
			jwtTokenProvider.getUsernameFromToken(refreshToken);
            // JWT 쿠키 저장(쿠키 명 : token)
            Cookie cookie = new Cookie("token", "Bearer" + accessToken);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60 * 24 * 1); // 유효기간 1일
            // httoOnly 옵션을 추가해 서버만 쿠키에 접근할 수 있게 설정
            cookie.setHttpOnly(true);
            response.addCookie(cookie);

            TokenDto rDto = new TokenDto();
            rDto.setNick(nick);
            rDto.setToken("Bearer" + refreshToken);
            tokenService.insertToken(rDto);

            // local storage 사용 시 해당 return map에 access token 정보를 함께 반환해주면 됨
            returnMap.put("result", "success");
            returnMap.put("msg", "JWT 발급 성공");
            return returnMap;
        }
    }

    // JWT 토큰 재발급
	@PostMapping("/access/refresh")
	public Map<String, Object> jwtTokenRefresh(@RequestParam String nick, 
    HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String, Object> returnMap = new HashMap<String, Object>();
		String refreshToken = null;
		String nickChk = "";
		
		// refreshToken 정보 조회
		TokenDto tDto = tokenService.getToken(nick);
        		
		// token 정보가 존재하지 않는 경우
		if(tDto == null) {
			returnMap.put("result", "fail");
			returnMap.put("msg", "refresh token 정보가 존재하지 않습니다.");
			return returnMap;
		}
		// token 정보가 존재하는 경우
		else {
			refreshToken = tDto.getToken();
		}
		
		// refreshToken이 존재하는 경우 검증
		boolean tokenFl = false;
		try {
			refreshToken = refreshToken.substring(7);
			nickChk = jwtTokenProvider.getUsernameFromToken(refreshToken);
			tokenFl = true;
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
		
		// refreshToken 사용이 불가능한 경우
		if(!tokenFl) {
			returnMap.put("result", "fail");
			returnMap.put("msg", "refresh token이 만료되었거나 정보가 존재하지 않습니다.");
			
			// refreshToken 정보 조회 실패 시 기존에 존재하는 refreshToken 정보 삭제
			tokenService.deleteToken(nick);
			return returnMap;
		}
		
		// refreshToken 인증 성공인 경우 accessToken 재발급
		if(nickChk != null && !nickChk.equals("")) {
			// 권한 map 저장
			Map<String, Object> rules = memberService.AuthLevelCheck(nick);
			
			// JWT 발급
			String tokens = jwtTokenProvider.generateAccessToken(nick, rules);
			String accessToken = URLEncoder.encode(tokens, "utf-8");
			
			log.info("[JWT 재발급] accessToken : " + accessToken);
			
			// JWT 쿠키 저장(쿠키 명 : token)
			Cookie cookie = new Cookie("token", "Bearer " + accessToken);
			cookie.setPath("/");
			cookie.setMaxAge(60 * 60 * 24 * 1); // 유효기간 1일
			// httoOnly 옵션을 추가해 서버만 쿠키에 접근할 수 있게 설정
			cookie.setHttpOnly(true);
			response.addCookie(cookie);
			
			returnMap.put("result", "success");
			returnMap.put("msg", "JWT가 발급되었습니다.");
		}else {
			returnMap.put("result", "fail");
			returnMap.put("msg", "access token 발급 중 문제가 발생했습니다.");
			return returnMap;
		}
		
		return returnMap;
	}

}
