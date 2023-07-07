package com.bit.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.dto.TokenDto;
import com.bit.mapper.TokenMapper;

@Service
public class TokenService {

    @Autowired
    TokenMapper tokenMapper;

    public TokenDto getToken(String nick) {
        return tokenMapper.getToken(nick);
    }

    public void updateToken(String nick, String refreshToken) {
        Map<String, String> map = new HashMap<>();
        map.put("nick", nick);
        map.put("refreshToken", refreshToken);
        tokenMapper.updateToken(map);
    }

    // 로그인시 refreshToken db에 저장
    public void insertToken(TokenDto tokenDto) {
        tokenMapper.insertToken(tokenDto);
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

}
