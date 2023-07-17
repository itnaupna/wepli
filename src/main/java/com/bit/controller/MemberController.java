package com.bit.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bit.dto.MemberDto;
import com.bit.dto.MypageDto;
import com.bit.dto.UserConfirmDto;
import com.bit.service.ImgUploadService;
import com.bit.service.MemberService;
import com.bit.service.UserConfirmService;

@RestController
@RequestMapping("/api")
@Slf4j
public class MemberController {
    @Autowired
    MemberService mService;
    @Autowired
    UserConfirmService uService;
    @Autowired
    ImgUploadService imgUploadService;

    HashMap<String, String> auth = new HashMap<String, String>();

    // 회원가입 api
    @PostMapping("/lv0/m/member")
    public boolean postMember(@RequestBody MemberDto mDto) {
        log.info(String.valueOf(mDto));
        return mService.joinMember(mDto);
    }

    // 이메일 중복체크. 중복이면 true
    @GetMapping("/lv0/m/email")
    public boolean getEmail(@RequestParam String email) {
        return mService.checkEmailExists(email);
    }

    // 닉네임 중복체크. 중복이면 true
    @GetMapping("/lv0/m/nick")
    public boolean getNick(@RequestParam String nick) {
        return mService.checkNickExists(nick);
    }

    // 전번 중복체크
    @GetMapping("/lv0/m/phone")
    public boolean getPhone(@RequestParam String phone) {
        return mService.checkPhoneExists(phone);
    }

    // 비밀번호만 확인
    @PostMapping("/lv1/m/checkpassword")
    public boolean postCheckPassword(@CookieValue String token, @RequestParam String pw) {
        return mService.checkPassword(token, pw);
    }

    // 인증코드 생성
    // 0-이메일, 1-전화
    @PostMapping("/lv1/m/requestcode")
    public boolean postRequestCode(@RequestBody UserConfirmDto data){
        return uService.RequestCode(data.getType(),data.getKey());
    }

    // 인증코드 검증
    // 0-이메일, 1-전화
    @PostMapping("/lv1/m/verifycode")
    public boolean postVerifyCode(@RequestBody UserConfirmDto data){
        return uService.VerifyCode(data.getType(),data.getKey(),data.getCode());
    }

    // 닉넴 변경
    @PatchMapping("/lv1/m/nick")
    public boolean patchNick(@CookieValue String token, String nick, HttpServletRequest request ,HttpServletResponse response) throws Exception {
        return mService.changeNick(token, nick, request, response);
    }

    // 비번 변경
    @PatchMapping("/lv1/m/pw")
    public boolean patchPw(@CookieValue String token, String oldPw, String newPw, HttpServletResponse response) {
        return mService.changePassword(token, oldPw, newPw, response);
    }

    // 탈퇴
    @DeleteMapping("/lv1/m/member")
    public boolean deleteMember(@CookieValue String token,@RequestParam String pw, HttpServletResponse response) {
        return mService.deleteMember(token, pw, response);
    }

    // 자기소개 변경
    @PatchMapping("/lv1/m/desc")
    public boolean patchDesc(@RequestBody MemberDto mDto) {
        return mService.updateDesc(mDto);
    }

    // 프사 변경
    // TODO : (확인) 밑에 새로 만들었는데 따로 사용할 일 있을지 체크
    // @PatchMapping("/lv1/m/img")
    // public boolean patchImg(@RequestBody MemberDto mDto) {
    //     return mService.updateImg(mDto);
    // }

    // 마이페이지 데이터 일괄
    @GetMapping("/lv1/m/mypage")
    public MypageDto getMypageDto(String nick) {
        return mService.selectMypageDto(nick);
    }

    //로그인
    @PostMapping("/lv0/m/login")
    public Map<String, Object> access(String email, String pw,@RequestParam(required = false) boolean autoLogin,
     HttpServletRequest request, HttpServletResponse response){
            return mService.Login(email, pw, autoLogin, request, response); 
    }

    // 소셜 로그인 파라미터 -> email,socialtype
    @PostMapping("/lv0/social")
    public Map<String, Object> socialLogin(@RequestBody Map<String, String> data, HttpServletRequest request, HttpServletResponse response) {
        return mService.socialLogin(data, request, response);
    }

    //로그아웃
    //TODO : (확인) 로그아웃시 엑세스토큰이 만료되어있으면 해당 유저의 리프레시 토큰이 삭제가 안되는점 수정
    @PostMapping("/lv1/m/logout")
    public void logout(@CookieValue String token, HttpServletRequest request, HttpServletResponse response) throws Exception {
        mService.logout(token, request, response);
    }

    // 프로필 사진 변경
    @PostMapping("lv1/m/profile")
    public String postProfileImg(@CookieValue String token, MultipartFile upload) {
        return imgUploadService.uploadImg(token, "profile", upload);
    }
    // 111111 ~ 999999 자리 인증코드 발송
    @PostMapping("/lv1/m/sendemail")
    @ResponseBody
    public void sendCode(String email) {
        mService.emailConfirm(email);
    }

}