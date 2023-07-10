package com.bit.service;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;

import com.bit.dto.MemberDto;
import com.bit.dto.MypageDto;
import com.bit.dto.TokenDto;
import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.MemberMapper;

import naver.cloud.NcpObjectStorageService;

@Service
public class MemberService {
    @Autowired
    MemberMapper memberMapper;
     @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    TokenService tokenService;

    // 회원가입
    public boolean joinMember(MemberDto mDto) {
        try {
            if (mDto.getEmail().length() < 1 || mDto.getPw().length() < 1 || mDto.getNick().length() < 1)
                return false;
            return memberMapper.insertJoinMember(mDto) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    // 이메일 중복검사
    public boolean checkEmailExists(String email) {
        return memberMapper.selectCheckEmailExists(email) > 0;
    }

    // 닉네임 중복검사
    public boolean checkNickExists(String nick) {
        return memberMapper.selectCheckNickExists(nick) > 0;
    }

    // 전화 중복검사
    public boolean checkPhoneExists(String phone) {
        return memberMapper.selectCheckPhoneExists(phone) > 0;
    }

    // 유저정보 받아오기
    public MemberDto getMemberDto(String email) {
        MemberDto mDto = memberMapper.selectMemberDto(email);
        mDto.setPw("1234");
        return mDto;
    }

    // 비밀번호 확인
    public boolean checkPassword(MemberDto mDto) {
        return memberMapper.selectCheckPasswordByEmail(mDto) > 0;
    }

    // 이메일 인증여부 확인
    public boolean checkEmailConfirm(String email) {
        return memberMapper.selectCheckEmailConfirm(email) > 0;
    }

    // 전화번호 인증여부 확인
    public boolean checkPhoneConfirm(String email) {
        return memberMapper.selectCheckPhoneConfirm(email) > 0;
    }

    // 이메일 인증
    public boolean emailConfirm(String email) {
        // TODO : 이메일 인증 알고리즘 추가
        return memberMapper.updateEmailConfirm(email) > 0;
    }

    // 전화번호 인증
    public boolean phoneConfirm(String email) {

        // TODO : 전화 인증 알고리즘 추가
        return memberMapper.updatePhoneConfirm(email) > 0;

    }

    // 닉넴 변경
    public boolean changeNick(String email, String nick) {
        if (checkNickExists(nick))
            return false;

        Map<String, String> data = new HashMap<>();
        data.put("email", email);
        data.put("nick", nick);
        return memberMapper.updateNick(data) > 0;
    }

    // 비밀번호 변경
    public boolean changePassword(String email, String oldPw, String newPw) {
        MemberDto mDto = new MemberDto();
        mDto.setEmail(email);
        mDto.setPw(oldPw);
        if (!checkPassword(mDto))
            return false;

        Map<String, String> data = new HashMap<>();
        data.put("email", email);
        data.put("pw", newPw);
        return memberMapper.updatePw(data) > 0;
    }

    // 회원 탈퇴
    public boolean deleteMember(MemberDto mDto) {
        return memberMapper.deleteMember(mDto) > 0;
    }

    // 자기소개 변경
    public boolean updateDesc(MemberDto mDto) {
        return memberMapper.updateDesc(mDto) > 0;
    }

    // 프사 변경
    public boolean updateImg(MemberDto mDto) {
        return memberMapper.updateImg(mDto) > 0;
    }

    // 블랙리스트 받아오기
    public List<String> getBlackList(String black) {
        return memberMapper.selectBlacklist(black);
    }

    // 블랙리스트 추가
    public boolean insertBlacklist(String black, String target) {
        Map<String, String> data = new HashMap<>();
        data.put("black", black);
        data.put("target", target);
        return memberMapper.insertBlacklist(data) > 0;
    }

    // 블랙리스트 삭제
    public boolean deleteBlacklist(String black, String target) {
        Map<String, String> data = new HashMap<>();
        data.put("black", black);
        data.put("target", target);
        return memberMapper.deleteBlacklist(data) > 0;
    }

    // 블랙리스트 옵션 받아오기
    public Map<String, Integer> selectBlackOpt(String nick) {
        return memberMapper.selectBlackOpt(nick);
    }

    // 블랙리스트 옵션 변경
    public boolean updateBlackOpt(String nick, int hidechat, int mute) {
        Map<String, Object> data = new HashMap<>();
        data.put("nick", nick);
        data.put("hidechat", hidechat);
        data.put("mute", mute);
        return memberMapper.updateBlackOpt(data) > 0;
    }

    // 팔로우 목록 받아오기
    public List<String> selectFollowList(String nick) {
        return memberMapper.selectFollowlist(nick);
    }

    // 팔로우 추가
    public boolean insertFollowlist(String follow, String target) {
        Map<String, String> data = new HashMap<>();
        data.put("follow", follow);
        data.put("target", target);
        return memberMapper.insertFollowlist(data) > 0;
    }

    // 팔로우 삭제
    public boolean deleteFollowlist(String follow, String target) {
        Map<String, String> data = new HashMap<>();
        data.put("follow", follow);
        data.put("target", target);
        return memberMapper.deleteFollowlist(data) > 0;
    }

    // 닉넴으로 마이페이지 정보 불러오기
    public MypageDto selectMypageDto(String nick) {
        return memberMapper.selectMypageDto(nick);
    }

   

    //로그인 시도.
    public Map<String, Object> Login(String email, String pw, HttpServletRequest request,
            HttpServletResponse response) {
        Map<String, Object> result = new HashMap<>();
        try {

            Map<String, String> data = new HashMap<>();
            data.put("email", email);
            data.put("pw", pw);
            boolean boolLogin = memberMapper.selectLogin(data) > 0;
            if (boolLogin) {
                // 로긴 성공하면
                Map<String, Object> claims = new HashMap<>();
                MypageDto userDto = memberMapper.selectMypageDtoByEmail(email);
                claims.put("roles",
                        userDto.getEmailconfirm() + userDto.getPhoneconfirm() > 0 ? "ROLE_auth2" : "ROLE_auth");

                Map<String, String> tokens = jwtTokenProvider.generateTokenSet(userDto.getNick(), claims);
                String accessToken = URLEncoder.encode(tokens.get("accessToken"), "utf-8");
                String refreshToken = URLEncoder.encode(tokens.get("refreshToken"), "utf-8");

                Cookie cookie = new Cookie("token", "Bearer" + accessToken);
                cookie.setPath("/");
                cookie.setMaxAge(60 * 60 * 24 * 1);
                cookie.setHttpOnly(true);
                response.addCookie(cookie);

                TokenDto tokenDto = new TokenDto();
                tokenDto.setNick(userDto.getNick());
                tokenDto.setAccessToken(accessToken);
                tokenDto.setRefreshToken(refreshToken);
                tokenService.insertToken(tokenDto);

                result.put("result", "true");
                result.put("data", userDto);

            } else {
                // 로긴 실패하면
                result.put("result", "false");
            }

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            result.put("result", "error");
            result.put("ecode",e.getMessage());
            return result;
        }
    }

    //로그아웃 시도
    public void logout(@CookieValue String token, HttpServletRequest request, HttpServletResponse response){
        Cookie cookie = new Cookie("token", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        tokenService.deleteToken(nick);
    }

    // 메일, 문자인증 여부에따라 권한 부여
    //TODO : 삭제예정
    public Map<String, Object> AuthLevelCheck(String nick) {
        MemberDto auth = memberMapper.AuthLevelCheck(nick);

        Map<String, Object> map = new HashMap<>();
        map.put("nick", nick);
        if (auth.getEmailconfirm() >= 1 || auth.getPhoneconfirm() >= 1) {
            map.put("roles", "ROLE_auth2");
            return map;
        } else {
            map.put("roles", "ROLE_auth");
            return map;
        }
    }

    // 로그인
    // public boolean Login(String email, String pw) {
    // Map<String, String> login = new HashMap<>();
    // login.put("email", email);
    // login.put("pw", pw);

    // return memberMapper.selectLogin(login)==0;
    // }

    // email로 nick 가져오기
    // TODO : 삭제예정
    public String getNickName(String email) {
        return memberMapper.getNickName(email);
    }

}
