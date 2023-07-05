package com.bit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.dto.MemberDto;
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


}
