package com.bit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bit.dto.PlaylistDto;
import com.bit.dto.PliCommentDto;
import com.bit.dto.SongDto;
import com.bit.service.PlaylistService;

@RestController
@RequestMapping("/api")
public class PlaylistController {

    @Autowired
    PlaylistService pService;
    
    @GetMapping("/lv0/p/list")
    public List<PlaylistDto> getList(boolean orderByDay, int curr, int cpp){
        return pService.selectPublicPlaylist(orderByDay, curr, cpp);
    }

    @GetMapping("/lv2/p/listlike")
    public List<PlaylistDto> getLikes(String nick){
        return pService.selectLikePli(nick);
    }

    @PostMapping("/lv1/p/list")
    public boolean postList(PlaylistDto data){
        return pService.insertPlaylist(data);
    }

    @GetMapping("/lv0/p/search")
    public List<PlaylistDto> getSearch(int type, String queryString){
        return pService.SearchStages(type, queryString);
    }

    @PostMapping("/lv2/p/like")
    public List<Object> postLike(String nick, int playlistID){
        return pService.togglePlaylist(nick, playlistID);
    }

    @PatchMapping("/lv1/p/list")
    public boolean patchList(PlaylistDto data){
        return pService.updatePlaylist(data);
    }

    @DeleteMapping("/lv1/p/list")
    public boolean deleteList(int idx){
        return pService.deletePlaylist(idx);
    }

    @PostMapping("/lv1/p/song")
    public boolean postSong(SongDto data){
        return pService.insertSong(data);
    }

    @GetMapping("/lv0/p/song")
    public SongDto getSong(int idx){
        return pService.selectSong(idx);
    }

    @GetMapping("/lv0/p/songs")
    public List<SongDto> getSongs(int playlistID){
        return pService.selectSongsAll(playlistID);
    }

    @PatchMapping("/lv1/p/song")
    public boolean patchSong(SongDto data){
        return pService.updateSong(data);
    }

    @DeleteMapping("/lv1/p/song")
    public boolean deleteSong(int idx){
        return pService.deleteSong(idx);
    }

    @GetMapping("/lv0/p/comments")
    public List<PliCommentDto> getComments(int playlistID, int curr, int cpp){
        return pService.selectPliComments(playlistID, curr, cpp);
    }

    @PostMapping("/lv2/p/comment")
    public boolean postComment(PliCommentDto data){
        return pService.insertPliComment(data);
    }

    @PatchMapping("/lv2/p/comment")
    public boolean patchComment(PliCommentDto data){
        return pService.updatePliComment(data);
    }

    @DeleteMapping("/lv2/p/comment")
    public boolean deleteComment(int idx){
        return pService.deletePliComment(idx);
    }

}
