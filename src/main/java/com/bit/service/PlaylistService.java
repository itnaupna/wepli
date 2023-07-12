package com.bit.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.dto.PlaylistDto;
import com.bit.dto.PliCommentDto;
import com.bit.dto.SongDto;
import com.bit.mapper.PlaylistMapper;

@Service
public class PlaylistService {
    @Autowired
    PlaylistMapper pMapper;

    public PlaylistDto selectPlaylist(int idx) {
        return pMapper.selectPlaylist(idx);
    }

    public List<PlaylistDto> selectPublicPlaylist(boolean orderByDay, int curr, int cpp){
        Map<String,Object> data = new HashMap<>();
        data.put("orderByDay",orderByDay);
        data.put("curr",(curr-1)*cpp);
        data.put("cpp",cpp);
        return pMapper.selectPublicPlaylist(data);
    }

    public List<PlaylistDto> selectLikePli(String nick){
        return pMapper.selectLikePli(nick);
    }

    public boolean insertPlaylist(PlaylistDto data){
        //TODO : 미인증 회원일경우 공개로 추가할 수 없도록 강제해야함
        return pMapper.insertPlaylist(data)>0;
    }

    public List<PlaylistDto> SearchStages(int type, String queryString) {
        switch (type) {
            case 0:
                return selectSearchByTitle(queryString);
            case 1:
                return selectSearchByNick(queryString);
            case 2:
                return selectSearchByGenre(queryString);
            case 3:
                return selectSearchByTag(queryString);
            default:
                return null;
        }
    }

    public List<PlaylistDto> selectSearchByNick(String nick) {
        return pMapper.selectSearchByNick(nick);
    }

    public List<PlaylistDto> selectSearchByTitle(String title) {
        return pMapper.selectSearchByTitle(title);
    }

    public List<PlaylistDto> selectSearchByGenre(String queryString) {
        List<String> queryStrings = Arrays.stream(queryString.split(","))
                .map(String::trim)
                .filter(str -> !str.isEmpty())
                .collect(Collectors.toList());
        return pMapper.selectSearchByGenre(queryStrings);
    }

    public List<PlaylistDto> selectSearchByTag(String queryString) {
        List<String> queryStrings = Arrays.stream(queryString.split(","))
                .map(String::trim)
                .filter(str -> !str.isEmpty())
                .collect(Collectors.toList());
        return pMapper.selectSearchByTag(queryStrings);
    }

    public List<Object> togglePlaylist(String nick, int playlistID){
        List<Object> result = new ArrayList<>();
        
        try {
            Map<String,Object> data = new HashMap<>();
            data.put("nick",nick);
            data.put("playlistID",playlistID);
            boolean isLike=pMapper.selectLike(data)>0;
            boolean processResult;
            if(isLike){
                pMapper.deleteLike(data);
                processResult = false;
            }else{
                pMapper.insertLike(data);
                processResult = true;
            }
            result.add(true);
            result.add(processResult);
            result.add(pMapper.selectPlaylist(playlistID).getLikescount());

            return result;
            //{true,true,278}
        } catch (Exception e) {
            result.add(false);
            //{false}
            return result;
        }
    }

    public boolean updatePlaylist(PlaylistDto data){
        //TODO : 미인증 회원일경우 공개여부 검증
        return pMapper.updatePlaylist(data)>0;
    }

    public void updatePlayListImg(int idx, String img) {
        PlaylistDto pDto = new PlaylistDto();
        pDto.setIdx(idx);
        pDto.setImg(img);
        pMapper.updatePlayListImg(pDto);
    }

    public boolean deletePlaylist(int idx){
        //TODO : 소유주 정보에 대한 검증이 필요한지 확인
        return pMapper.deletePlaylist(idx)>0;
    }

    public PlaylistDto selectFirstPlaylist(String nick){
        //대표 플레이리스트를 불러오긴 하는데... 50명이면 50번 호출. 이게맞나?
        //TODO : SQL 로직에 대해 DB부하가 많이 예상됨
        return pMapper.selectFirstPlaylist(nick);
    }

    public boolean insertSong(SongDto data){
        return pMapper.insertSong(data)>0;
    }

    public SongDto selectSong(int idx){
        return pMapper.selectSong(idx);
    }

    public List<SongDto> selectSongsAll(int playlistID){
        return pMapper.selectSongsAll(playlistID);
    }

    public boolean updateSong(SongDto data){
        return pMapper.updateSong(data)>0;
    }

    public void updateSongImg(int idx, String img) {
        SongDto sDto = new SongDto();
        sDto.setIdx(idx);
        sDto.setImg(img);
        pMapper.updateSongImg(sDto);
    }

    public boolean deleteSong(int idx){
        return pMapper.deleteSong(idx)>0;
    }

    public List<PliCommentDto> selectPliComments(int playlistID, int curr, int cpp){
        Map<String,Object> data = new HashMap<>();
        data.put("playlistID",playlistID);
        data.put("curr",(curr-1)*cpp);
        data.put("cpp",cpp);
        return pMapper.selectPliComments(data);
    }

    public boolean insertPliComment(PliCommentDto data){
        return pMapper.insertPliComment(data)>0;
    }
    public boolean updatePliComment(PliCommentDto data){
        return pMapper.updatePliComment(data)>0;
    }

    public boolean deletePliComment(int idx){
        return pMapper.deletePliComment(idx)>0;
    }

}
