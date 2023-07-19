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
import org.springframework.web.multipart.MultipartFile;

import com.bit.dto.PlaylistDto;
import com.bit.dto.PliCommentDto;
import com.bit.dto.SongDto;
import com.bit.service.ImgUploadService;
import com.bit.service.PlaylistService;

@RestController
@RequestMapping("/api")
public class PlaylistController {

    @Autowired
    PlaylistService pService;

    @Autowired
    ImgUploadService imgUploadService;
    
    // 검색, 필터, 출력
    @GetMapping("/lv0/p/list")
    public List<PlaylistDto> getList(@CookieValue(required = false) String token, @RequestParam(required = false) String queryString, 
    @RequestParam(required = false)String type, boolean orderByDay, int curr, int cpp){
        return pService.selectPublicPlaylist(token, queryString, type, orderByDay, curr, cpp);
    }

    // 좋아요 누른 플레이리스트 가져오기
    @GetMapping("/lv2/p/listlike")
    public List<PlaylistDto> getLikes(@CookieValue String token) {
        return pService.selectLikePli(token);
    }

    // 팔로우한 사람의 플레이리스트 가져오기
    @GetMapping("/lv2/p/listfollow")
    public List<PlaylistDto> getFollow(@CookieValue String token) {
        return pService.selectFollowPli(token);
    }

    // 내플레이리스트 or 타인의 공개된 플레이리스트 가져오기
    @GetMapping("/lv1/p/playlist")
    public List<PlaylistDto> getPlaylist(@CookieValue String token, @RequestParam(required = false) String userNick) {
        return pService.selectPli(token, userNick);
    }

    // 플레이리스트 추가
    @PostMapping("/lv1/p/list")
    public boolean postList(@CookieValue String token, @RequestBody PlaylistDto data, HttpServletResponse response){
        return pService.insertPlaylist(token, data, response);
    }

    // 좋아요 추가, 삭제
    @PostMapping("/lv2/p/like")
    public List<Object> postLike(@CookieValue String token, int playlistID){
        return pService.togglePlaylist(token, playlistID);
    }

    // 플레이리스트 수정
    @PatchMapping("/lv1/p/list")
    public boolean patchList(@CookieValue String token, @RequestBody PlaylistDto data, HttpServletResponse response){
        return pService.updatePlaylist(token, data, response);
    }

    // 플레이리스트 대표사진 변경
    @PostMapping("lv1/p/profile")
    public String changePlaylistImg(int idx, MultipartFile upload) {
        return imgUploadService.uploadImg(idx, "playlist", upload);
    }

    // 플레이리스트 삭제
    @DeleteMapping("/lv1/p/list")
    public boolean deleteList(@CookieValue String token, int idx){
        return pService.deletePlaylist(token, idx);
    }

    // 곡 추가
    @PostMapping("/lv1/p/song")
    public boolean postSong(SongDto data){
        return pService.insertSong(data);
    }

    // 곡 1개 가져오기
    @GetMapping("/lv0/p/song")
    public SongDto getSong(int idx){
        return pService.selectSong(idx);
    }

    // 플레이리스트 내 곡 모두 가져오기
    @GetMapping("/lv0/p/songs")
    public List<SongDto> getSongs(int playlistID){
        return pService.selectSongsAll(playlistID);
    }

    // 곡 1개 수정
    @PatchMapping("/lv1/p/song")
    public boolean patchSong(SongDto data){
        return pService.updateSong(data);
    }

    // 곡 1개 삭제
    @DeleteMapping("/lv1/p/song")
    public boolean deleteSong(int idx){
        return pService.deleteSong(idx);
    }

    // 곡 사진 변경
    @PostMapping("lv1/song/profile")
    public String changeSongImg(int idx, MultipartFile upload) {
        return imgUploadService.uploadImg(idx, "songimg", upload);
    }

    // 플레이리스트 댓글 출력
    @GetMapping("/lv0/p/comments")
    public List<PliCommentDto> getComments(int playlistID, int curr, int cpp){
        return pService.selectPliComments(playlistID, curr, cpp);
    }

    // 플레이리스트 댓글작성
    @PostMapping("/lv2/p/comment")
    public boolean postComment(@CookieValue String token, @RequestBody PliCommentDto data){
        return pService.insertPliComment(token, data);
    }

    // 플레이리스트 댓글 수정
    @PatchMapping("/lv2/p/comment")
    public boolean patchComment(@CookieValue String token, @RequestBody PliCommentDto data){
        return pService.updatePliComment(token, data);
    }

    // 플레이리스트 댓글 삭제(플리 주인, 댓글작성자만 삭제 가능)
    @DeleteMapping("/lv2/p/comment")
    public boolean deleteComment(@CookieValue String token, @RequestBody PliCommentDto data){
        return pService.deletePliComment(token, data);
    }

}
