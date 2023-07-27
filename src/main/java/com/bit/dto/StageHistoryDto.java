package com.bit.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class StageHistoryDto {
    private int idx;
    private String nick;
    private String stageaddress;
    private String songaddress;
    private String songtitle;
    private String songauthor;
    private String songlength;
    private String songimg;
    private int likes;
    private int dislikes;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private Timestamp playdate;
}
