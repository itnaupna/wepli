package com.bit.dto;



import lombok.Data;

@Data
public class MypageDto {
    private String email;
    private String nick;
    private String phone;
    private int emailconfirm;
    private int phoneconfirm;
    private String img;
    private String desc;
    private String socialtype;
    private String lstblack;
    private int hidechat;
    private int mute;
    private String lstfollow;
    private String lstpli;
    private String stagetitle;
    private String stageaddress;
}
