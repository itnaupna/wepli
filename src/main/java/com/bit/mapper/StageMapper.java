package com.bit.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bit.dto.StageDto;

@Mapper
public interface StageMapper {

    public int insertStage(StageDto sDto);

    public List<StageDto> selectStageAll(Map<String, Object> data);

    public List<StageDto> selectFollowStage(String nick);
    public StageDto selectStageOneByAddress(String address);

    public StageDto selectStageOneByMasterNick(String nick);

    public int updateStage(StageDto sDto);
    
    public int deleteStage(String nick);

    public int selectCheckStagePw(Map<String,String> data);

    public List<StageDto> selectSearchByNick(String nick);
    public List<StageDto> selectSearchByTitle(String title);

    public List<StageDto> selectSearchByGenre(List<String> genres);
    public List<StageDto> selectSearchByTag(List<String> tags);

    /* TODO 
        검색(닉넴,제목,장르,태그)

    */
    


}
