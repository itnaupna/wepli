package com.bit.dto;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class BuiltStageDto {
    private SongDto songInfo;
    private int startTimeStamp;
    private int voteup;
    private int votedown;
    private Map<String,String> Users = new HashMap<>();
}