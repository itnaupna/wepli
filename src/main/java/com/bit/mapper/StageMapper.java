package com.bit.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bit.dto.StageDto;

@Mapper
public interface StageMapper {

    public int insertStage(StageDto sDto);

    public void updateImg(Map<String, String> nickAndImg);

    public List<StageDto> selectStageAll(Map<String, Object> data);

    public List<StageDto> selectFollowStage(String nick);

    public StageDto selectStageOneByAddress(String address);

    public StageDto selectStageOneByMasterNick(String nick);

    public int updateStage(StageDto sDto);

    public int deleteStage(String nick);

    public int selectCheckStagePw(Map<String, String> data);

    public List<StageDto> selectSearchByNick(Map<String, List<String>> nickAndBlack);

    public List<StageDto> selectSearchByTitle(Map<String, List<String>> titleAndBlack);

    public List<StageDto> selectSearchByGenre(Map<String, List<String>> genreAndBlack);

    public List<StageDto> selectSearchByTag(Map<String, List<String>> tagAndBlack);

    // TODO : (확인) 검색시 블랙리스트 제외 

}
