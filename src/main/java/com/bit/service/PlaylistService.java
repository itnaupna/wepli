package com.bit.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.dto.MypageDto;
import com.bit.dto.PlaylistDto;
import com.bit.dto.PliCommentDto;
import com.bit.dto.SongDto;
import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.BlacklistMapper;
import com.bit.mapper.MemberMapper;
import com.bit.mapper.PlaylistMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PlaylistService {
    @Autowired
    PlaylistMapper pMapper;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    BlacklistMapper blacklistMapper;

    @Autowired
    MemberMapper memberMapper;

    public PlaylistDto selectPlaylist(int idx) {
        return pMapper.selectPlaylist(idx);
    }

    public List<PlaylistDto> selectPublicPlaylist(String token, String queryString, String type, boolean orderByDay, int curr, int cpp){
        Map<String,Object> data = new HashMap<>();
        data.put("orderByDay",orderByDay);
        data.put("curr",(curr-1)*cpp);
        data.put("cpp",cpp);
        Map<String, List<String>> searchAndBlack = new HashMap<>();

        if(token != null && !token.equals("")) {
            String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
            List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
            searchAndBlack.put("black", blackTarget);
        }
        if(queryString != null && !queryString.equals("")) {
            List<String> queryStrings = Arrays.stream(queryString.split(","))
                    .map(String::trim)
                    .filter(str -> !str.isEmpty())
                    .collect(Collectors.toList());
            searchAndBlack.put("list", queryStrings);
        }

        return pMapper.selectPublicPlaylist(searchAndBlack, data, type);

    }

    // 좋아요 누른 플레이리스트 가져오기
    public List<PlaylistDto> selectLikePli(String token){
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return pMapper.selectLikePli(nick);
    }

    // 팔로우한 사람의 플레이리스트 가져오기
    public List<PlaylistDto> selectFollowPli(String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return pMapper.selectFollowPli(nick);
    }

    // 내플레이리스트 or 타인의 공개된 플레이리스트 가져오기
    public List<PlaylistDto> selectPli(String token, String userNick) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        log.info("userNick -> {}", userNick);
        if(userNick == null) {
            return pMapper.selectMyPli(nick);
        } else {
            nick = userNick;
            return pMapper.selectUserFromPublicPli(nick);
        }
    }

    // 미인증회원 검증절차
    public boolean uncertifiMemberChk(String nick) {
        MypageDto mDto = memberMapper.selectMypageDto(nick);
        boolean authChk = mDto.getEmailconfirm() + mDto.getPhoneconfirm() > 0 ?
            true : false;
        return authChk;
        
    }

    //TODO : (확인) 미인증 회원일경우 공개로 추가할 수 없도록 강제해야함
    public boolean insertPlaylist(PlaylistDto data, HttpServletResponse response){
        if(uncertifiMemberChk(data.getNick())) {
            return pMapper.insertPlaylist(data)>0;
        } else {
            if(data.getIsPublic() == 0) {
                return pMapper.insertPlaylist(data)>0;
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return false;
            }
        }
    }

    //TODO : (확인) 미인증 회원일경우 공개여부 검증
    public boolean updatePlaylist(PlaylistDto data, HttpServletResponse response){
        if(uncertifiMemberChk(data.getNick())) {
            return pMapper.updatePlaylist(data)>0;
        } else {
            if(data.getIsPublic() == 0) {
                return pMapper.insertPlaylist(data)>0;
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return false;
            }
        }
    }

        public void updatePlayListImg(int idx, String img) {
        PlaylistDto pDto = new PlaylistDto();
        pDto.setIdx(idx);
        pDto.setImg(img);
        pMapper.updatePlayListImg(pDto);
    }
    // TODO: 검토 후 삭제
    // public List<PlaylistDto> SearchStages(int type, String queryString, String token, String gen) {
    //     switch (type) {
    //         case 0:
    //             return selectSearchByTitle(queryString, token);
    //         case 1:
    //             return selectSearchByNick(queryString, token);
    //         case 2:
    //             return selectSearchByGenre(queryString, token, gen);
    //         case 3:
    //             return selectSearchByTag(queryString, token);
    //         default:
    //             return null;
    //     }
    // }

    // public List<PlaylistDto> selectSearchByTitle(String queryString, String token) {
    //     Map<String, List<String>> searchAndBlack = new HashMap<>();

    //     if(token != null && !token.equals("")) {
    //         String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
    //         List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
    //         searchAndBlack.put("black", blackTarget);
    //     }
    //     List<String> queryStrings = Arrays.stream(queryString.split(","))
    //         .map(String::trim)
    //         .filter(str -> !str.isEmpty())
    //         .collect(Collectors.toList());
    //     searchAndBlack.put("list", queryStrings);
    //     return pMapper.selectSearchByTitle(searchAndBlack);
    // }

    // public List<PlaylistDto> selectSearchByNick(String queryString, String token) {
    //     Map<String, List<String>> searchAndBlack = new HashMap<>();

    //     if(token != null && !token.equals("")) {
    //         String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
    //         List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
    //         searchAndBlack.put("black", blackTarget);
    //     }
    //     List<String> queryStrings = Arrays.stream(queryString.split(","))
    //         .map(String::trim)
    //         .filter(str -> !str.isEmpty())
    //         .collect(Collectors.toList());
    //     searchAndBlack.put("list", queryStrings);
    //     return pMapper.selectSearchByNick(searchAndBlack);
    // }

    // public List<PlaylistDto> selectSearchByGenre(String queryString, String token, String type) {
    //     Map<String, List<String>> searchAndBlack = new HashMap<>();

    //     if(token != null && !token.equals("")) {
    //         String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
    //         List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
    //         searchAndBlack.put("black", blackTarget);
    //     }
    //     if(queryString != null && !queryString.equals("")) {
    //         List<String> queryStrings = Arrays.stream(queryString.split(","))
    //                 .map(String::trim)
    //                 .filter(str -> !str.isEmpty())
    //                 .collect(Collectors.toList());
    //         searchAndBlack.put("list", queryStrings);
    //     }
    //     return pMapper.selectSearchByGenre(searchAndBlack, type);
    // }

    // public List<PlaylistDto> selectSearchByTag(String queryString, String token) {
    //     Map<String, List<String>> searchAndBlack = new HashMap<>();

    //     if(token != null && !token.equals("")) {
    //         String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
    //         List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
    //         searchAndBlack.put("black", blackTarget);
    //     }
    //     List<String> queryStrings = Arrays.stream(queryString.split(","))
    //             .map(String::trim)
    //             .filter(str -> !str.isEmpty())
    //             .collect(Collectors.toList());
    //     searchAndBlack.put("list", queryStrings);
    //     return pMapper.selectSearchByTag(searchAndBlack);
    // }

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

    public boolean deletePlaylist(String token, int idx){
        //TODO : (확인) 소유주 정보에 대한 검증이 필요한지 확인
        String nick = jwtTokenProvider.getUsernameFromToken(token);
        String pliNick = pMapper.selectPlaylist(idx).getNick();

        
        if(nick.equals(pliNick)) {
            return pMapper.deletePlaylist(idx)>0;
        } else {
            throw new RuntimeException("소유주가 아님");
        }        
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
