package com.bit.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.dto.MemberDto;
import com.bit.jwt.JwtTokenProvider;
import com.bit.jwt.UserAuthentication;
import com.bit.service.MemberService;

@RestController
@RequestMapping("/api")
public class MemberController {
    @Autowired
    MemberService mService;

    @PostMapping("/member")
    public ResponseEntity<?> postMember(MemberDto mDto) {

        if (mService.joinMember(mDto)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("회원가입에 실패하였습니다.");
        }
    }

    @GetMapping("/email")
    public boolean getEmail(String email){

        return mService.checkEmailExists(email);
    }

    @GetMapping("/nick")
    public boolean getNick(String nick){

        return mService.checkNickExists(nick);
    }

    @GetMapping("/login")
	public Map<String, String> login(String email,String pw)
	{
		System.out.println("login>>"+email+","+pw);
		int n = mService.getLogin(email, pw);
		
		Map<String, String> map = new HashMap<>();

		if(n==1) {
			
			Authentication authentication = new UserAuthentication(email, null,null);
			String token = JwtTokenProvider.generateToken(authentication, email);
			
			System.out.println("token="+token);
			map.put("token",token);
			map.put("success", n==1?"yes":"no");
		}
		
		return map;
	}




}
