package com.bit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bit.dto.PlaylistDto;

// @Mapper
public interface PlaylistMapper {
    public List<PlaylistDto> selectPublicPlaylist();
    public List<PlaylistDto> selectPlaylistByNick(String nick);
    
}
