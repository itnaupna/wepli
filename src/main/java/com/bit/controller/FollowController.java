package com.bit.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.service.FollowService;

@RestController
@RequestMapping("/api")
public class FollowController {

    @Autowired
    FollowService followService;

    // 팔로우 리스트 얻기
    @GetMapping("/lv2/m/follow")
    public List<Map<String, Object>> getFollow(@CookieValue String token) {
        return followService.selectFollowList(token);
    }

    // 팔로워 리스트 얻기
    @GetMapping("/lv2/m/follower")
    public List<Map<String, Object>> getFollower(@CookieValue String token) {
        return followService.selectFollowerlist(token);
    }

    //TODO : 블랙유저 팔로우시, 그 반대일경우에 대해 처리
    /*
        1. 해당 유저가 블랙상태인지 검사
        2-1. 블랙상태라면 블랙상태라고 안내 후 팔로우시 블랙상태가 해제된다고 알림. 동의시 진행, 미동의시 종료
        2-2. 블랙상태가 아니라면 진행
        3. 팔로우 상태인지 검사
        4-1. 팔로우 상태면 팔로우 해제
        4-2. 팔로우 상태가 아니라면 팔로우 추가
        5. 종료
    */
    //TODO : togglePlaylist 형식으로 로직변경
    // 팔로우 추가
    @PostMapping("/lv2/m/follow")
    public boolean postFollow(@RequestBody String nick, @RequestBody String target) {
        return followService.insertFollowlist(nick, target);
    }

    // 팔로우 삭제
    @DeleteMapping("/lv2/m/follow")
    public boolean deleteFollow(@RequestBody String nick, @RequestBody String target) {
        return followService.deleteFollowlist(nick, target);
    }
}
