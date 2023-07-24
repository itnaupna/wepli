package com.bit.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bit.dto.MypageDto;
import com.bit.dto.StageDto;
import com.bit.service.ImgUploadService;
import com.bit.service.MemberService;
import com.bit.service.StageService;

@RestController
@RequestMapping("/api")
public class StageController {
    @Autowired
    StageService sService;

    @Autowired
    ImgUploadService imgUploadService;

    @Autowired
    MemberService mService;

    // @GetMapping("/lv0/s/test")
    // public Map<String,Integer> testMethod(){
    //     // return sService.selectStage();
    // }

    //스테이지 목록 가져오기
    @GetMapping("/lv0/s/stage")
    public List<StageDto> getStage(@CookieValue(required=false) String token, int curr, int cpp) {
        return sService.selectStageAll(token, curr, cpp);
    }

    //스테이지 검색
    //0-제목, 1-닉넴, 2-장르, 3-태그
    //장르와 태그는 , (쉼표)로 구분
    // @GetMapping("/lv0/s/search")
    // public List<StageDto> getSearch(@CookieValue(required = false) String token, int type, String queryString) {
    //     return sService.SearchStages(type, queryString, token);
    // }

    @GetMapping("/lv0/s/search")
    public List<StageDto> getSearch(@CookieValue(required = false) String token, @RequestParam(required = false) String queryString, 
    @RequestParam(required = false)String type, boolean orderByDay, int curr, int cpp) {
        return sService.selectSearchStage(token, queryString, type, orderByDay, curr, cpp);
    }

    // //특정 닉네임 스테이지 가져오기
    // @GetMapping("/lv0/s/n/{nick}")
    // public StageDto getStageByNick(String nick) {
    //     return sService.selectStageOneByMasterNick(nick);
    // }

    // //특정 주소 스테이지 가져오기
    // @GetMapping("/lv0/s/stage/{address}")
    // public StageDto getStageByAddress(String address) {
    //     return sService.selectStageOneByAddress(address);
    // }

    // 스테이지 생성
    // 데이터 -> address, title, desc, genre, tag, nick, makeday, img, maxlength, skipratio
    // 선택적 데이터- > pw
    @PostMapping("/lv2/s/stage")
    public boolean postStage(@RequestBody StageDto sDto,@CookieValue String token) {
        return sService.insertStage(sDto,token);
    }

    //팔로우한 스테이지 목록 가져오기
    @GetMapping("/lv2/s/fstage")
    public List<StageDto> getFStage(@CookieValue String token) {
        return sService.selectStageFollow(token);
    }

    // 스테이지 정보 수정
    // 데이터 -> address, title, desc, genre, tag, img, maxlength, skipratio
    // 선택적 데이터 -> pw
    @PatchMapping("/lv2/s/stage")
    public boolean patchStage(@RequestBody StageDto sDto,@CookieValue String token) {
        return sService.updateStage(sDto,token);
    }

    //스테이지 삭제
    @DeleteMapping("/lv2/s/stage")
    public boolean deleteStage(@CookieValue String token, String pw, String title) {
        return sService.deleteStage(token, pw, title);
    }

    //유저 정보 불러오기
    @GetMapping("/lv1/s/userinfo")
    public MypageDto getMypageDto(@CookieValue String token, @RequestParam(required = false) String userNick, HttpServletResponse response) {
        return mService.selectMypageDto(token, userNick, response); 
    }
    

}
