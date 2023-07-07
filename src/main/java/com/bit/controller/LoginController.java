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
	public String auth1(@CookieValue String token) {
		log.info("accessToken: {}", token);

		jwtTokenProvider.getUsernameFromToken(token.substring(6));
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
            rDto.setRefreshToken("Bearer" + refreshToken);
			rDto.setAccessToken("Bearer" + accessToken);
            tokenService.insertToken(rDto);

            // local storage 사용 시 해당 return map에 access token 정보를 함께 반환해주면 됨
            returnMap.put("result", "success");
            returnMap.put("msg", "JWT 발급 성공");
            return returnMap;
        }
    }
}
