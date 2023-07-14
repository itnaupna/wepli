package com.bit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.FollowMapper;

@Service
public class FollowService {
    @Autowired
    FollowMapper followMapper;

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    // 팔로우 목록 받아오기
    public List<Map<String, Object>> selectFollowList(String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return followMapper.selectFollowlist(nick); 
    }
    
    // 팔로워 목록 받아오기
    public List<Map<String, Object>> selectFollowerlist(String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return followMapper.selectFollowerlist(nick);
    }

    // 팔로우 추가
    public boolean insertFollowlist(String follow, String target) {
        Map<String, String> data = new HashMap<>();
        data.put("follow", follow);
        data.put("target", target);
        return followMapper.insertFollowlist(data) > 0;
    }

    // 팔로우 삭제
    public boolean deleteFollowlist(String follow, String target) {
        Map<String, String> data = new HashMap<>();
        data.put("follow", follow);
        data.put("target", target);
        return followMapper.deleteFollowlist(data) > 0;
    }
}
