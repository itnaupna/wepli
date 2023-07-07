package com.bit.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


import com.bit.dto.MemberDto;


@Mapper
public interface MemberMapper {
    public int JoinMember(MemberDto mDto);
    public int CheckEmailExists(String email);
    public int CheckNickExists(String nick);
    public MemberDto AuthLevelCheck(String nick);
    public int Login(Map<String, String> map);
    public String getNickName(String email);
}
