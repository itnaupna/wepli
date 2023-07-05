package com.bit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bit.dto.StageDto;

@Mapper
public interface StageMapper {

    public int insertStage(StageDto sDto);

    public List<StageDto> selectStageAll();

    public StageDto selectStageOneByAddress(String address);

    public StageDto selectStageOneByMasterNick(String nick);

    public int updateStage(StageDto sDto);
    
    public int deleteStage(String nick);


}
