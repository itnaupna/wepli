package com.bit.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FollowMapper {
    
    //팔로우 목록 받아오기
    public List<Map<String, Object>> selectFollowlist(String nick);
    //팔로워 목록 받아오기
    public List<Map<String, Object>> selectFollowerlist(String nick);
    //팔로우 추가
    public int insertFollowlist(Map<String,String> data);
    //팔로우 삭제
    public int deleteFollowlist(Map<String,String> data);
}
