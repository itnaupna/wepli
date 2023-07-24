package com.bit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bit.dto.MemberDto;
import com.bit.dto.PlaylistDto;
import com.bit.dto.SongDto;
import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.MemberMapper;
import com.bit.mapper.PlaylistMapper;
import com.bit.mapper.StageMapper;

import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;

@Service
@Slf4j
public class ImgUploadService {

    public final String BUCKET_NAME = "wepli";

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    MemberMapper memberMapper;

    @Autowired
    StageMapper stageMapper;

    @Autowired
    PlaylistMapper playlistMapper;

    @Autowired
    NcpObjectStorageService ncpObjectStorageService;
    
    // TODO 수정 작업 취소시 이미지로 원래대로 돌림?
    /*이미지 변경 이벤트 -> 이미지 수정시 db에 img 이름 변수에 저장, 마지막 img 이름 저장
    * 컨펌 이벤트 -> 마지막 img 빼고 버킷 삭제 후 img + 변경 데이터 저장
      캔슬 이벤트 -> 첫번째 img 빼고 버킷 삭제 */ 

    public String uploadImg(String token, String directoryPath, MultipartFile upload) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        // log.info("nick: {}", nick);

        if (upload == null || upload.isEmpty()) {
            return "No image";
        }

        String originImage = "";
        String changeImage = "";

        if(directoryPath.equals("profile")) {
            originImage = memberMapper.selectMypageDto(nick).getImg();
        } else {
            originImage = stageMapper.selectStageOneByMasterNick(nick).getImg();
        }

        // log.info("originImage -> {}", originImage);
        
        if(originImage != null && !originImage.equals("")) {
            ncpObjectStorageService.deleteFile(BUCKET_NAME, directoryPath, originImage);   
        }

        changeImage = ncpObjectStorageService.uploadFile(BUCKET_NAME, directoryPath, upload);

        if(directoryPath.equals("profile")) {
            MemberDto mDto = new MemberDto();
            mDto.setNick(nick);
            mDto.setImg(changeImage);
            memberMapper.updateImg(mDto);
        } else {
            Map<String, String> nickAndImg = new HashMap<>();
            nickAndImg.put("nick", nick);
            nickAndImg.put("img", changeImage);
            stageMapper.updateImg(nickAndImg);
        }
        return "/" + directoryPath + "/" + changeImage;
    }

    public String uploadImg(String token, int idx, String directoryPath, MultipartFile upload, HttpServletResponse response) {

         if (upload == null || upload.isEmpty()) {
            return "No image";
        }

        String originImage = "";
        String changeImage = "";
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));

        if(directoryPath.equals("playlist")) {
            if(playlistMapper.selectMyPliToIdx(idx).getNick().equals(nick)) {
                originImage = playlistMapper.selectPlaylist(idx).getImg();
            } else {
                response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
                return "권한없음";
            }
        } else {
            SongDto sDto = playlistMapper.selectSong(idx);
            if(playlistMapper.selectMyPliToIdx(sDto.getPlaylistID()).getNick().equals(nick)) {
                originImage = sDto.getImg();
            } else {
                response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
                return "권한없음";
            }
        }

        if(originImage != null && !originImage.equals("")) {
            ncpObjectStorageService.deleteFile(BUCKET_NAME, directoryPath, originImage);   
        }

        changeImage = ncpObjectStorageService.uploadFile(BUCKET_NAME, directoryPath, upload);

        if(directoryPath.equals("playlist")) {
            PlaylistDto pDto = new PlaylistDto();
            pDto.setIdx(idx);
            pDto.setImg(changeImage);
            playlistMapper.updatePlayListImg(pDto);
        } else {
            SongDto sDto = new SongDto();
            sDto.setIdx(idx);
            sDto.setImg(changeImage);
            playlistMapper.updateSongImg(sDto);
        }

        return "/" + directoryPath + "/" + changeImage;
    }

    Map<String, List<String>> storageImg = new HashMap<>();

    public String storageImgUpload(String token, String directoryPath, MultipartFile upload) {
    String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
    List<String> imgData;

    String img = ncpObjectStorageService.uploadFile(BUCKET_NAME, directoryPath, upload);

    if(storageImg.get(directoryPath + nick) != null) {
        log.info("[storageImgUpload] -> {}", storageImg.get(directoryPath + nick));
        imgData = storageImg.get(directoryPath + nick);
        imgData.add(img);
        storageImg.put(directoryPath + nick, imgData);
    } else {
        imgData = new ArrayList<>();
        imgData.add(img);
        storageImg.put(directoryPath + nick, imgData);
    }
    return "/" + directoryPath + "/" + img;
    }

    public void storageImgDelete(String token, String directoryPath) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        
        List<String> imgData;

        if(storageImg.get(directoryPath + nick) != null) {
            log.info("[storageImgUpload] -> {}", storageImg.get(directoryPath + nick));
            imgData = storageImg.get(directoryPath + nick);
            for(int i = 0; i < imgData.size(); i++) {
                ncpObjectStorageService.deleteFile(BUCKET_NAME, directoryPath, imgData.get(i));
            }
            storageImg.remove(directoryPath + nick);
        }
    }

    public void storageImgDelete(String token, String img, String directoryPath) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        
        List<String> imgData;

        if(storageImg.get(directoryPath + nick) != null) {
            log.info("[storageImgUpload] -> {}", storageImg.get(directoryPath + nick));
            imgData = storageImg.get(directoryPath + nick);
            for(int i = 0; i < imgData.size(); i++) {
                if(!imgData.get(i).equals(img)) {
                    ncpObjectStorageService.deleteFile(BUCKET_NAME, directoryPath, imgData.get(i));
                }
            }
            storageImg.remove(directoryPath + nick);
        }
    }
}
