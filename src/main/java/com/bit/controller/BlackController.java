package com.bit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.service.BlacklistService;

@RestController
@RequestMapping("/api")
public class BlackController {
    @Autowired
    BlacklistService blacklistService;

    // 블랙리스트 받아오기
    @GetMapping("/lv2/m/blacklist")
    public List<String> getBlackList(String nick) {
    return blacklistService.getBlackList(nick);
    }

    // 블랙리스트 추가
    @PostMapping("/lv2/m/blacklist")
    public boolean postBlacklist(@RequestBody String nick, @RequestBody String target) {
        return blacklistService.insertBlacklist(nick, target);
    }

    // 블랙리스트 삭제
    @DeleteMapping("/lv2/m/blacklist")
    public boolean deleteBlacklist(@RequestBody String nick, @RequestBody String target) {
        return blacklistService.deleteBlacklist(nick, target);
    }

    // 블랙리스트 옵션 수정
    @PutMapping("/lv2/m/blackopt")
    public boolean putBlackopt(@RequestBody String nick, @RequestBody int hidechat, @RequestBody int mute) {
        return blacklistService.updateBlackOpt(nick, hidechat, mute);
    }
}
