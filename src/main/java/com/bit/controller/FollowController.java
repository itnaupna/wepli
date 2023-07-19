package com.bit.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bit.service.FollowService;

@RestController
@RequestMapping("/api")
public class FollowController {

    @Autowired
    FollowService followService;

    // 팔로우 리스트 얻기
    @GetMapping("/lv2/f/follow")
    public List<Map<String, Object>> getFollow(@CookieValue String token) {
        return followService.selectFollowList(token);
    }

    // 팔로워 리스트 얻기
    @GetMapping("/lv2/f/follower")
    public List<Map<String, Object>> getFollower(@CookieValue String token) {
        return followService.selectFollowerlist(token);
    }

    //TODO :(확인) 블랙유저 팔로우시, 그 반대일경우에 대해 처리
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
    // 팔로우 추가,삭제
    @PostMapping("/lv2/f/followtoggle")
    public int followAndUnfollow(@CookieValue String token, @RequestParam String target) {
        return followService.toggleFollowing(token, target);
    }

    // 팔로우 추가
    // TODO : 쓸일 있을지 확인 필요
    @PostMapping("/lv2/f/addfollow")
    public boolean postFollow(@CookieValue String token, @RequestParam String target) {
        return followService.insertFollowlist(token, target);
    }

    // 팔로우 취소
    @DeleteMapping("/lv2/f/unfollow")
    public boolean unFollow(@CookieValue String token, @RequestParam String target) {
        return followService.unFollowlist(token, target);
    }

    // 특정 유저가 나를 팔로우 했을시 팔로우 끊기(대상이 날 팔로우 한것을 끊음)
    @DeleteMapping("/lv2/f/delfollow")
    public boolean deleteFollow(@CookieValue String token, @RequestParam String target) {
        return followService.deleteFollowlist(token, target);
    }

    //대상 팔로우 여부
    @GetMapping("/lv2/f/isfollow")
    public int isFollowChk(@CookieValue String token, @RequestParam String target) {
        return followService.isFollowchk(token, target);
    }

    //팔로우 top50
    @GetMapping("/lv0/f/followtop")
    public List<Map<String, Object>> followTop() {
        return followService.selectFollowTop();
    }
}
