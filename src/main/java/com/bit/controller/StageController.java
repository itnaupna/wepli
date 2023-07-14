package com.bit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bit.dto.StageDto;
import com.bit.service.ImgUploadService;
import com.bit.service.StageService;

@RestController
@RequestMapping("/api")
public class StageController {
    @Autowired
    StageService sService;

    @Autowired
    ImgUploadService imgUploadService;

    //스테이지 목록 가져오기
    @GetMapping("/lv0/s/stage")
    public List<StageDto> getStage(String nick, int curr, int cpp) {
        return sService.selectStageAll(nick, curr, cpp);
    }

    //스테이지 검색
    //0-제목, 1-닉넴, 2-장르, 3-태그
    //장르와 태그는 , (쉼표)로 구분
    @GetMapping("/lv0/s/search")
    public List<StageDto> getSearch(@CookieValue(required = false) String token, int type, String queryString) {
        return sService.SearchStages(type, queryString, token);
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

    //스테이지 생성
    @PostMapping("/lv2/s/stage")
    public boolean postStage(@RequestBody StageDto sDto) {
        return sService.insertStage(sDto);
    }

    //팔로우한 스테이지 목록 가져오기
    @GetMapping("/lv2/s/fstage")
    public List<StageDto> getFStage(String nick) {
        return sService.selectStageFollow(nick);
    }

    //스테이지 정보 수정
    @PatchMapping("/lv2/s/stage")
    public boolean patchStage(@RequestBody StageDto sDto) {
        return sService.updateStage(sDto);
    }

    //스테이지 삭제
    @DeleteMapping("/lv2/s/stage")
    public boolean deleteStage(String nick, String pw) {
        return sService.deleteStage(nick, pw);
    }

    // 방 썸네일 변경
    @PostMapping("lv1/s/profile")
    public String postProfileImg(@CookieValue String token, MultipartFile upload) {
        return imgUploadService.uploadImg(token, "stage", upload);
    }

}
