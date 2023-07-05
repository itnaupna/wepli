package com.bit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.dto.MemberDto;
import com.bit.dto.MypageDto;
import com.bit.mapper.MemberMapper;

@Service
public class MemberService {
    @Autowired
    MemberMapper memberMapper;

    // 회원가입
    public boolean joinMember(MemberDto mDto) {
        try {
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

    public MypageDto selectMypageDto(String nick){
        return memberMapper.selectMypageDto(nick);
    }

    // // 랜덤 키값 생성용 메서드
    // public String generateState() {
    // SecureRandom random = new SecureRandom();
    // return new BigInteger(130, random).toString(32);
    // }

    // public String getNaverAuthUrl(String type) {
    // String baseUrl = "";
    // String clientId = "";
    // String redirectUrl = "";

    // try {
    // UriComponents uComponents = UriComponentsBuilder
    // .fromUriString(baseUrl + "/" + type)
    // .queryParam("response_type", "code")
    // .queryParam("client_id", clientId)
    // .queryParam("redirect_url", URLEncoder.encode(redirectUrl, "UTF-8"))
    // .queryParam("state", URLEncoder.encode("1234", "UTF-8"))
    // .build();
    // } catch (UnsupportedEncodingException e) {
    // // TODO Auto-generated catch block
    // e.printStackTrace();
    // }

    // return "";
    // }

}
