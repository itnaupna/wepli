package com.bit.service;

import java.util.List;

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
    
}
