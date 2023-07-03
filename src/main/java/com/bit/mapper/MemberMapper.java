package com.bit.mapper;

import org.apache.ibatis.annotations.Mapper;


import com.bit.dto.MemberDto;


@Mapper
public interface MemberMapper {
    public int insertJoinMember(MemberDto mDto);
    public int selectCheckEmailExists(String email);
    public int selectCheckNickExists(String nick);
    public int selectCheckPassword(String pw);
}
