package com.bit.controller;



import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bit.jwt.JwtTokenProvider;
import com.bit.service.MemberService;
import com.bit.service.TokenService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
public class LoginController {
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    TokenService tokenService;

    @GetMapping("/lv1/auth1")
    public String auth1(@CookieValue String token, HttpServletRequest request, HttpServletResponse response) throws Exception {
        // String target = tokenService.reGenerateAccessToken(token, response);
        log.info("cookie -> {}", token);
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        log.info("nick name -> {}", nick);

        return token;
    }

    @GetMapping("/lv2/auth2")
    public String auth2(@CookieValue String token, HttpServletRequest request, HttpServletResponse response) throws Exception {
        log.info("cookie -> {}", token);
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        log.info("nick name -> {}", nick);
        return token;
    }

}
