package com.bit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.dto.MemberDto;
import com.bit.dto.MypageDto;
import com.bit.service.MemberService;

@RestController
@RequestMapping("/api")
public class MemberController {
    @Autowired
    MemberService mService;

    // 회원가입 api
    @PostMapping("/lv0/m/member")
    public boolean postMember(@RequestBody MemberDto mDto) {
        return mService.joinMember(mDto);
    }

    // 이메일 중복체크. 중복이면 true
    @GetMapping("/lv0/m/email")
    public boolean getEmail(String email) {
        return mService.checkEmailExists(email);
    }

    // 닉네임 중복체크. 중복이면 true
    @GetMapping("/lv0/m/nick")
    public boolean getNick(String nick) {
        return mService.checkNickExists(nick);
    }

    // 전번 중복체크
    @GetMapping("/lv0/m/phone")
    public boolean getPhone(String phone) {
        return mService.checkPhoneExists(phone);
    }

    // // 유저정보 받아오기
    // @GetMapping("/member")
    // public MemberDto getMember(String email) {
    // return mService.getMemberDto(email);
    // }

    // 비밀번호만 확인
    @PostMapping("/lv1/m/checkPassword")
    public boolean postCheckPassword(@RequestBody MemberDto mDto) {
        return mService.checkPassword(mDto);
    }

    // // 이메일 인증여부 확인
    // @GetMapping("/checkemail")
    // public boolean getCheckEmailConfirm(String email) {
    // return mService.checkEmailConfirm(email);
    // }

    // // 전화 인증여부 확인
    // @GetMapping("/checkphone")
    // public boolean getCheckPhoneConfirm(String email) {
    // return mService.checkPhoneConfirm(email);
    // }

    // 닉넴 변경
    @PatchMapping("/lv1/m/nick")
    public boolean patchNick(@RequestBody String email, @RequestBody String nick) {
        return mService.changeNick(email, nick);
    }

    // 비번 변경
    @PatchMapping("/lv1/m/pw")
    public boolean patchPw(@RequestBody String email, @RequestBody String oldPw, @RequestBody String newPw) {
        return mService.changePassword(email, oldPw, newPw);
    }

    // 탈퇴
    @DeleteMapping("/lv1/m/member")
    public boolean deleteMember(@RequestBody MemberDto mDto) {
        return mService.deleteMember(mDto);
    }

    // 자기소개 변경
    @PatchMapping("/lv1/m/desc")
    public boolean patchDesc(@RequestBody MemberDto mDto) {
        return mService.updateDesc(mDto);
    }

    // 프사 변경
    @PatchMapping("/lv1/m/img")
    public boolean patchImg(@RequestBody MemberDto mDto) {
        return mService.updateImg(mDto);
    }

    // 블랙리스트 받아오기
    @GetMapping("/lv2/m/blacklist")
    public List<String> getBlackList(String nick) {
    return mService.getBlackList(nick);
    }

    // 블랙리스트 추가
    @PostMapping("/lv2/m/blacklist")
    public boolean postBlacklist(@RequestBody String nick, @RequestBody String target) {
        return mService.insertBlacklist(nick, target);
    }

    // 블랙리스트 삭제
    @DeleteMapping("/lv2/m/blacklist")
    public boolean deleteBlacklist(@RequestBody String nick, @RequestBody String target) {
        return mService.deleteBlacklist(nick, target);
    }

    // // 블랙리스트 옵션 얻기
    // @GetMapping("/blackopt")
    // public Map<String, Integer> getBlackopt(String nick) {
    // return mService.selectBlackOpt(nick);
    // }

    // 블랙리스트 옵션 수정
    @PutMapping("/lv2/m/blackopt")
    public boolean putBlackopt(@RequestBody String nick, @RequestBody int hidechat, @RequestBody int mute) {
        return mService.updateBlackOpt(nick, hidechat, mute);
    }

    // 팔로우 리스트 얻기
    @GetMapping("/lv2/m/follow")
    public List<String> getFollow(String nick) {
    return mService.selectFollowList(nick);
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
        return mService.insertFollowlist(nick, target);
    }

    // 팔로우 삭제
    @DeleteMapping("/lv2/m/follow")
    public boolean deleteFollow(@RequestBody String nick, @RequestBody String target) {
        return mService.deleteFollowlist(nick, target);
    }

    // 마이페이지 데이터 일괄
    @GetMapping("/lv1/m/mypage")
    public MypageDto getMypageDto(String nick) {
        return mService.selectMypageDto(nick);
    }

}
