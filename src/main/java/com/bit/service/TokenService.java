package com.bit.service;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.dto.MypageDto;
import com.bit.dto.TokenDto;
import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.MemberMapper;
import com.bit.mapper.TokenMapper;


@Service
public class TokenService {

    @Autowired
    TokenMapper tokenMapper;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    MemberMapper memberMapper;

    public TokenDto getToken(String nick) {
        return tokenMapper.getToken(nick);
    }

    public void updateToken(TokenDto tDto) {
        tokenMapper.updateToken(tDto);
    }

    // 로그인시 refreshToken db에 저장
    public void insertToken(String token) {
        tokenMapper.insertToken(token);
    }

    // 토큰 삭제
    public void deleteToken(String nick) {
        tokenMapper.deleteToken(nick);
    }

    public String accessToRefresh(String accessToken) {
        return tokenMapper.accessToRefresh(accessToken);
    }

    public void updateAccessToken(String refreshToken, String accessToken) {
        Map<String, String> map = new HashMap<>();
        map.put("refreshToken", refreshToken);
        map.put("accessToken", accessToken);
        tokenMapper.updateAccessToken(map);
    }

    // 토큰 발급 로직
    public Map<String, Object> generateToken(Map<String, String> data, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> claims = new HashMap<>();
        MypageDto userDto = memberMapper.selectMypageDtoByEmail(data.get("email"));
        claims.put("roles",
            userDto.getEmailconfirm() + userDto.getPhoneconfirm() > 0 ? "ROLE_auth2" : "ROLE_auth");

        Map<String, String> tokens = jwtTokenProvider.generateTokenSet(userDto.getNick(), claims);
        String accessToken = URLEncoder.encode(tokens.get("accessToken"), "utf-8");
        String refreshToken = URLEncoder.encode(tokens.get("refreshToken"), "utf-8");
        Cookie cookie = new Cookie("token", "Bearer" + accessToken);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24 * 1);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        TokenDto tDto = new TokenDto();
        tDto.setNick(userDto.getNick());
        tDto.setAccessToken("Bearer" + accessToken);
        tDto.setRefreshToken("Bearer" + refreshToken);
        tokenMapper.updateToken(tDto);

        result.put("result", "true");
        result.put("data", userDto);

        return result;
   }

}
