package com.bit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.BlacklistMapper;
import com.bit.mapper.FollowMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BlacklistService {

    @Autowired
    BlacklistMapper blacklistMapper;

    @Autowired
    FollowMapper followMapper;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    public List<String> selectBlackTarget(String nick) {
        return blacklistMapper.selectBlackTarget(nick);
    }

    // 블랙리스트 받아오기
    public List<Map<String, Object>> getBlackList(String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return blacklistMapper.selectBlacklist(nick);
    }

    // 블랙리스트 추가
    public boolean insertBlacklist(String token, String target) {
        Map<String, String> data = new HashMap<>();
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        data.put("follow", nick);
        data.put("target", target);

        if(followMapper.isFollowchk(data) > 0) {
            followMapper.unFollowlist(data);    
        }

        data.remove("follow");
        data.put("black", nick);
        
        log.info("Map in nick -> {}", data.get("black"));
        log.info("Map in target -> {}", data.get("target"));

        return blacklistMapper.insertBlacklist(data) > 0;
    }

    // 블랙리스트 삭제
    public boolean deleteBlacklist(String token, String target) {
        Map<String, String> data = new HashMap<>();
        String black = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        data.put("black", black);
        data.put("target", target);
        return blacklistMapper.deleteBlacklist(data) > 0;
    }

    // 블랙리스트 옵션 받아오기
    public Map<String, Integer> selectBlackOpt(String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return blacklistMapper.selectBlackOpt(nick);
    }

    // 블랙리스트 옵션 변경
    public boolean updateBlackOpt(String token, int hidechat, int mute) {
        Map<String, Object> data = new HashMap<>();
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        data.put("nick", nick);
        data.put("hidechat", hidechat);
        data.put("mute", mute);
        return blacklistMapper.updateBlackOpt(data) > 0;
    }

    // 대상 블랙 여부
    public int isBlackchk(String token, String target) {
        String black = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        Map<String, String> blackAndTarget = new HashMap<>();
        blackAndTarget.put("black", black);
        blackAndTarget.put("target", target);

        return blacklistMapper.isBlackchk(blackAndTarget);
    }
    
}
