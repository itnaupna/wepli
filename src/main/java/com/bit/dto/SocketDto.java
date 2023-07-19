package com.bit.dto;

import lombok.Data;

@Data
public class SocketDto {
    
    public enum Types{
        ENTER,
        EXIT,
        SKIP,
        VOTE_UP,
        VOTE_DOWN,
        KICK,
        BAN,
        DELETE,
        IN_QUEUE,
        OUT_QUEUE,
        CHANGE_QUEUE_ORDER,
        CHANGE_QUEUE_SONG,
        CHAT
    }

    private Types type;
    private String stageId;
    private String userNick;
    private String msg;
}
