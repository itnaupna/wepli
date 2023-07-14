package com.bit.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BlacklistMapper {
    
    public List<String> selectBlackTarget(String nick);
    //블랙리스트 받아오기
    public List<String> selectBlacklist(String black);
    //블랙리스트 추가
    public int insertBlacklist(Map<String,String> data);
    //블랙리스트 삭제
    public int deleteBlacklist(Map<String,String> data);
    //블랙리스트 옵션 받아오기
    public Map<String,Integer> selectBlackOpt(String nick);
    //블랙리스트 옵션 변경
    public int updateBlackOpt(Map<String,Object> data);
}
