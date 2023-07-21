package com.bit.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class BuiltStageDto {
    private SongDto songInfo;
    private int startTimeStamp;
    private int voteup;
    private int votedown;
    private List<String> Users = new ArrayList<>();
}
