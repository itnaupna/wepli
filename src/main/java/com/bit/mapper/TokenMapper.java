package com.bit.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bit.dto.TokenDto;

@Mapper
public interface TokenMapper {
    public TokenDto getToken(String nick);
    public void updateToken(Map<String, String> token);
    public void insertToken(TokenDto tokenDto);
    public void deleteToken(String nick);
    public String accessToRefresh(String accessToken);
    public void updateAccessToken(Map<String, String> map);

}
