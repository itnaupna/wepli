package com.bit.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bit.dto.PlaylistDto;
import com.bit.dto.PliCommentDto;
import com.bit.dto.SongDto;

@Mapper
public interface PlaylistMapper {

    // IDX를 통한 플레이리스트 1개 정보 가져오기
    public PlaylistDto selectPlaylist(int idx);

    // 공개된 플레이리스트 목록 가져오기
    public List<PlaylistDto> selectPublicPlaylist(Map<String, Object> data);

    // 좋아요 누른 플레이리스트 가져오기
    public List<PlaylistDto> selectLikePli(String nick);

    // 플레이리스트 생성
    public int insertPlaylist(PlaylistDto data);

    // 제목, 닉넴, 장르, 태그
    // TODO : 검색시 블랙리스트 제외
    public List<PlaylistDto> selectSearchByTitle(String title);

    public List<PlaylistDto> selectSearchByNick(String nick);

    public List<PlaylistDto> selectSearchByGenre(List<String> genres);

    public List<PlaylistDto> selectSearchByTag(List<String> tags);

    // 좋아요 여부 검사, 좋아요 추가, 좋아요 취소
    public int selectLike(Map<String, Object> data);

    public int insertLike(Map<String, Object> data);

    public int deleteLike(Map<String, Object> data);

    // 플리 수정
    public int updatePlaylist(PlaylistDto data);

    // 플리 썸네일 수정
    public void updatePlayListImg(PlaylistDto idxAndImg);

    // 플리 삭제
    public int deletePlaylist(int idx);

    // 특정 유저의 대표 플레이리스트(가장 많은 좋아요)
    public PlaylistDto selectFirstPlaylist(String nick);

    // 개별곡 CRUD
    public int insertSong(SongDto data);

    public SongDto selectSong(int idx);

    public List<SongDto> selectSongsAll(int playlistID);

    public int updateSong(SongDto data);

    // 음악별 썸네일 수정
    public void updateSongImg(SongDto idxAndImg);

    public int deleteSong(int idx);

    // 덧글 CRUD
    public List<PliCommentDto> selectPliComments(Map<String, Object> data);

    public int insertPliComment(PliCommentDto data);

    public int updatePliComment(PliCommentDto data);

    public int deletePliComment(int idx);

}
