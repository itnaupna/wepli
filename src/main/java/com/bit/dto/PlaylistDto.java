package com.bit.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
public class PlaylistDto {
    private int idx;
    private String title;
    private String desc;
    private String genre;
    private String tag;
    private String img;
    private int isPublic;
    private String nick;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private Timestamp makeday;
    private List<SongDto> songs;
    private List<PliComment> comments;
}