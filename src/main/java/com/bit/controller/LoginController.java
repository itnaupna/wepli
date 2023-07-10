package com.bit.controller;



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

}
