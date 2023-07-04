package com.bit.service;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.bit.dto.MemberDto;
import com.bit.mapper.MemberMapper;

@Service
public class MemberService {
    @Autowired
    MemberMapper memberMapper;

    // 회원가입
    public boolean joinMember(MemberDto mDto) {
        try {
            return memberMapper.JoinMember(mDto) > 0;
        } catch (Exception e) {
            return false;
        }
    }

    // 이메일 중복검사
    public boolean checkEmailExists(String email) {
        return memberMapper.CheckEmailExists(email) > 0;
    }

    // 닉네임 중복검사
    public boolean checkNickExists(String nick) {
        return memberMapper.CheckNickExists(nick) > 0;
    }

    // // 랜덤 키값 생성용 메서드
    // public String generateState() {
    //     SecureRandom random = new SecureRandom();
    //     return new BigInteger(130, random).toString(32);
    // }

    // public String getNaverAuthUrl(String type) {
    //     String baseUrl = "";
    //     String clientId = "";
    //     String redirectUrl = "";

    //     try {
    //         UriComponents uComponents = UriComponentsBuilder
    //                 .fromUriString(baseUrl + "/" + type)
    //                 .queryParam("response_type", "code")
    //                 .queryParam("client_id", clientId)
    //                 .queryParam("redirect_url", URLEncoder.encode(redirectUrl, "UTF-8"))
    //                 .queryParam("state", URLEncoder.encode("1234", "UTF-8"))
    //                 .build();
    //     } catch (UnsupportedEncodingException e) {
    //         // TODO Auto-generated catch block
    //         e.printStackTrace();
    //     }

    //     return "";
    // }
    
    public Map<String, String> AuthLevelCheck(String nick) {
        MemberDto auth = memberMapper.AuthLevelCheck(nick);
        
        Map<String, String> map = new HashMap<>();
        map.put("nick", nick);
        if(auth.getEmailconfirm() >= 1 || auth.getPhoneconfirm() >= 1) { 
            map.put("auth", "auth2");
            return map;
        } else {
            map.put("auth", "auth");
            return map;
        }
    }

    
}
