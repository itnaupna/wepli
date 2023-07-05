package com.bit.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.dto.MemberDto;
import com.bit.dto.MypageDto;
import com.bit.service.MemberService;

@RestController
@RequestMapping("/api/m")
public class MemberController {
    @Autowired
    MemberService mService;

    // 회원가입 api
    @PostMapping("/member")
    public boolean postMember(MemberDto mDto) {
        return mService.joinMember(mDto);
    }

    // 이메일 중복체크. 중복이면 true
    @GetMapping("/email")
    public boolean getEmail(String email) {
        return mService.checkEmailExists(email);
    }

    // 닉네임 중복체크. 중복이면 true
    @GetMapping("/nick")
    public boolean getNick(String nick) {
        return mService.checkNickExists(nick);
    }

    // 전번 중복체크
    @GetMapping("/phone")
    public boolean getPhone(String phone) {
        return mService.checkPhoneExists(phone);
    }

    // // 유저정보 받아오기
    // @GetMapping("/member")
    // public MemberDto getMember(String email) {
    //     return mService.getMemberDto(email);
    // }

    // 비밀번호만 확인
    @PostMapping("/checkPassword")
    public boolean postCheckPassword(MemberDto mDto) {
        return mService.checkPassword(mDto);
    }

    // // 이메일 인증여부 확인
    // @GetMapping("/checkemail")
    // public boolean getCheckEmailConfirm(String email) {
    //     return mService.checkEmailConfirm(email);
    // }

    // // 전화 인증여부 확인
    // @GetMapping("/checkphone")
    // public boolean getCheckPhoneConfirm(String email) {
    //     return mService.checkPhoneConfirm(email);
    // }

    // 닉넴 변경
    @PatchMapping("/nick")
    public boolean patchNick(String email, String nick) {
        return mService.changeNick(email, nick);
    }

    // 비번 변경
    @PatchMapping("/pw")
    public boolean patchPw(String email, String oldPw, String newPw) {
        return mService.changePassword(email, oldPw, newPw);
    }

    // 탈퇴
    @DeleteMapping("/member")
    public boolean deleteMember(MemberDto mDto) {
        return mService.deleteMember(mDto);
    }

    // 자기소개 변경
    @PatchMapping("/desc")
    public boolean patchDesc(MemberDto mDto) {
        return mService.updateDesc(mDto);
    }

    // 프사 변경
    @PatchMapping("/img")
    public boolean patchImg(MemberDto mDto) {
        return mService.updateImg(mDto);
    }

    // // 블랙리스트 받아오기
    // @GetMapping("/blacklist")
    // public List<String> getBlackList(String nick) {
    //     return mService.getBlackList(nick);
    // }

    // 블랙리스트 추가
    @PostMapping("/blacklist")
    public boolean postBlacklist(String nick, String target) {
        return mService.insertBlacklist(nick, target);
    }

    // 블랙리스트 삭제
    @DeleteMapping("/blacklist")
    public boolean deleteBlacklist(String nick, String target) {
        return mService.deleteBlacklist(nick, target);
    }

    // // 블랙리스트 옵션 얻기
    // @GetMapping("/blackopt")
    // public Map<String, Integer> getBlackopt(String nick) {
    //     return mService.selectBlackOpt(nick);
    // }

    // 블랙리스트 옵션 수정
    @PutMapping("/blackopt")
    public boolean putBlackopt(String nick, int hidechat, int mute) {
        return mService.updateBlackOpt(nick, hidechat, mute);
    }

    // // 팔로우 리스트 얻기
    // @GetMapping("/follow")
    // public List<String> getFollow(String nick) {
    //     return mService.selectFollowList(nick);
    // }

    // 팔로우 추가
    @PostMapping("/follow")
    public boolean postFollow(String nick, String target) {
        return mService.insertFollowlist(nick, target);
    }

    // 팔로우 삭제
    @DeleteMapping("/follow")
    public boolean deleteFollow(String nick, String target) {
        return mService.deleteFollowlist(nick, target);
    }

    //마이페이지 데이터 일괄
    @GetMapping("/mypage")
    public MypageDto getMypageDto(String nick){
        return mService.selectMypageDto(nick);
    }

}
