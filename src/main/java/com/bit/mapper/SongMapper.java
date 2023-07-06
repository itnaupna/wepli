package com.bit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bit.dto.SongDto;

@Mapper
public interface SongMapper {
    public boolean insertSong(SongDto sDto);
    public SongDto selectSong(int idx);
    public List<SongDto> selectSongsInPli(int playlistID);
    public boolean updateSong(SongDto sDto);
    public boolean deleteSong(int idx);
}
