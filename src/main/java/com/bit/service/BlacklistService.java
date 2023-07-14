package com.bit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.mapper.BlacklistMapper;

@Service
public class BlacklistService {

    @Autowired
    BlacklistMapper blacklistMapper;

    public List<String> selectBlackTarget(String nick) {
        return blacklistMapper.selectBlackTarget(nick);
    }

    // 블랙리스트 받아오기
    public List<String> getBlackList(String nick) {
        return blacklistMapper.selectBlacklist(nick);
    }

    // 블랙리스트 추가
    public boolean insertBlacklist(String black, String target) {
        Map<String, String> data = new HashMap<>();
        data.put("black", black);
        data.put("target", target);
        return blacklistMapper.insertBlacklist(data) > 0;
    }

    // 블랙리스트 삭제
    public boolean deleteBlacklist(String black, String target) {
        Map<String, String> data = new HashMap<>();
        data.put("black", black);
        data.put("target", target);
        return blacklistMapper.deleteBlacklist(data) > 0;
    }

    // 블랙리스트 옵션 받아오기
    public Map<String, Integer> selectBlackOpt(String nick) {
        return blacklistMapper.selectBlackOpt(nick);
    }

    // 블랙리스트 옵션 변경
    public boolean updateBlackOpt(String nick, int hidechat, int mute) {
        Map<String, Object> data = new HashMap<>();
        data.put("nick", nick);
        data.put("hidechat", hidechat);
        data.put("mute", mute);
        return blacklistMapper.updateBlackOpt(data) > 0;
    }
    
}
