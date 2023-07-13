package com.bit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.dto.MemberDto;
import com.bit.dto.MypageDto;
import com.bit.dto.TokenDto;
import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.MemberMapper;

import lombok.extern.slf4j.Slf4j;

// import naver.cloud.NcpObjectStorageService;

@Service
@Slf4j
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
            mDto.setEmailconfirm(mDto.getSocialtype() == null ? 0 : 1);
            if (mDto.getEmail().length() < 1 || mDto.getPw().length() < 1 || mDto.getNick().length() < 1) {
                return false;
            } else {
                tokenService.insertToken(mDto.getNick());
                return memberMapper.insertJoinMember(mDto) > 0;
            }
            
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
    public boolean checkPassword(String token, String pw) {
        MemberDto mDto = new MemberDto();
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        mDto.setNick(nick);
        mDto.setPw(pw);
        return memberMapper.selectCheckPasswordByNick(mDto) > 0;
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
    public boolean changePassword(String token, String oldPw, String newPw) {
        MemberDto mDto = new MemberDto();
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        mDto.setNick(nick);
        mDto.setPw(oldPw);

        if (memberMapper.selectCheckPasswordByNick(mDto) == 0) {
            return false;
        }

        Map<String, String> data = new HashMap<>();
        data.put("nick", nick);
        data.put("pw", newPw);
        return memberMapper.updatePw(data) > 0;
    }

    // 회원 탈퇴
    public boolean deleteMember(MemberDto mDto) {
        tokenService.deleteToken(mDto.getNick());
        return memberMapper.deleteMember(mDto) > 0;
    }

    // 자기소개 변경
    public boolean updateDesc(MemberDto mDto) {
        return memberMapper.updateDesc(mDto) > 0;
    }

    // 프사 변경
    public boolean updateImg(String nick, String img) {
        MemberDto mDto = new MemberDto();
        mDto.setNick(nick);
        mDto.setImg(img);
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
    public Map<String, Object> Login(Map<String, String> data, HttpServletRequest request,
            HttpServletResponse response) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean boolLogin = memberMapper.selectLogin(data) > 0;
            if (boolLogin) {
                log.info("success");
                // 로긴 성공하면
                result = tokenService.generateToken(data, request, response);

            } else {
                // 로긴 실패하면 -> 회원이 아님
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            log.info("error");
            result.put("result", "error");
            result.put("ecode",e.getMessage());
            return result;
        }
    }

    // 소셜로그인
    public Map<String,Object> socialLogin(Map<String, String> data, HttpServletRequest request,
            HttpServletResponse response) {
        Map<String, Object> result = new HashMap<>();
        try {

            boolean boolLogin = memberMapper.CheckMemberExists(data) > 0;
            if (boolLogin) {
                // 로긴 성공하면
                result = tokenService.generateToken(data, request, response);
            } else {
                // 로긴 실패하면 -> 에러 가입된 소셜회원 없음 -> 소셜 회원가입으로 이동
                 response.setStatus(HttpServletResponse.SC_NOT_FOUND);
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
    public void logout(String token, HttpServletRequest request, HttpServletResponse response) throws Exception{
        log.info(token);
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        log.info("logout nick -> {}", nick);
        TokenDto tDto = new TokenDto();
        tDto.setNick(nick);
        tDto.setAccessToken("");
        tDto.setRefreshToken("");
        tokenService.updateToken(tDto);

        Cookie cookie = new Cookie("token", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

}
