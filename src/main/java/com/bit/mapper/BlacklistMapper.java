package com.bit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BlacklistMapper {
    
    public List<String> selectBlackTarget(String nick);
}
