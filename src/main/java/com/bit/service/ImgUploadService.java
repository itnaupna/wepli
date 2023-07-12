package com.bit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bit.jwt.JwtTokenProvider;

import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;

@Service
@Slf4j
public class ImgUploadService {

    public final String BUCKET_NAME = "wepli";

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    MemberService memberService;

    @Autowired
    StageService stageService;

    @Autowired
    PlaylistService playlistService;

    @Autowired
    NcpObjectStorageService ncpObjectStorageService;
    
    // TODO 수정 작업 취소시 이미지로 원래대로 돌림?
    /*이미지 변경 이벤트 -> 이미지 수정시 db에 img 이름 변수에 저장, 마지막 img 이름 저장
    * 컨펌 이벤트 -> 마지막 img 빼고 버킷 삭제 후 img + 변경 데이터 저장
      캔슬 이벤트 -> 첫번째 img 빼고 버킷 삭제 */ 

    public String uploadImg(String token, String directoryPath, MultipartFile upload) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        // log.info("nick: {}", nick);

        String originImage = "";
        String changeImage = "";

        if(directoryPath.equals("profile")) {
            originImage = memberService.selectMypageDto(nick).getImg();
        } else {
            originImage = stageService.selectStageOneByMasterNick(nick).getImg();
        }

        // log.info("originImage -> {}", originImage);
        
        if(originImage != null && !originImage.equals("")) {
            ncpObjectStorageService.deleteFile(BUCKET_NAME, directoryPath, originImage);   
        }

        changeImage = ncpObjectStorageService.uploadFile(BUCKET_NAME, directoryPath, upload);

        if(directoryPath.equals("profile")) {
            memberService.updateImg(nick, changeImage);
        } else {
            stageService.updateImg(nick, changeImage);
        }
        return "/" + directoryPath + "/" + changeImage;
    }

    public String uploadImg(int idx, String directoryPath, MultipartFile upload) {

        String originImage = "";
        String changeImage = "";

        if(directoryPath.equals("playlist")) {
            originImage = playlistService.selectPlaylist(idx).getImg();
        } else {
            originImage = playlistService.selectSong(idx).getImg();
        }

        if(originImage != null && !originImage.equals("")) {
            ncpObjectStorageService.deleteFile(BUCKET_NAME, directoryPath, originImage);   
        }

        changeImage = ncpObjectStorageService.uploadFile(BUCKET_NAME, directoryPath, upload);

        if(directoryPath.equals("playlist")) {
            playlistService.updatePlayListImg(idx, changeImage);
        } else {
            playlistService.updateSongImg(idx, changeImage);
        }

        return "/" + directoryPath + "/" + changeImage;
    }
}
