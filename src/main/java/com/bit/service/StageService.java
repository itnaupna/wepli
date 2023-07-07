package com.bit.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.dto.MemberDto;
import com.bit.dto.StageDto;
import com.bit.mapper.MemberMapper;
import com.bit.mapper.StageMapper;

@Service
public class StageService {
    @Autowired
    StageMapper sMapper;
    @Autowired
    MemberMapper mMapper;

    public boolean insertStage(StageDto sDto) {
        return sMapper.insertStage(sDto) > 0;
    }

    public List<StageDto> selectStageAll(String nick, int curr, int cpp) {
        Map<String, Object> data = new HashMap<>();
        data.put("nick", nick);
        data.put("curr", (curr - 1) * cpp);
        data.put("cpp", cpp);
        return sMapper.selectStageAll(data);
    }

    public List<StageDto> selectStageFollow(String nick) {
        return sMapper.selectFollowStage(nick);
    }

    public StageDto selectStageOneByAddress(String address) {
        return sMapper.selectStageOneByAddress(address);
    }

    public StageDto selectStageOneByMasterNick(String nick) {
        return sMapper.selectStageOneByMasterNick(nick);
    }

    public boolean updateStage(StageDto sDto) {
        return sMapper.updateStage(sDto) > 0;
    }

    public boolean deleteStage(String nick, String pw) {
        MemberDto mDto = new MemberDto();
        mDto.setNick(nick);
        mDto.setPw(pw);
        if (mMapper.selectCheckPasswordByNick(mDto) < 1)
            return false;
        return sMapper.deleteStage(nick) > 0;
    }

    public boolean selectCheckStagePw(String nick, String pw) {
        Map<String, String> data = new HashMap<>();
        data.put("nick", nick);
        data.put("pw", pw);
        return sMapper.selectCheckStagePw(data) > 0;
    }

    public List<StageDto> SearchStages(int type, String queryString) {
        switch (type) {
            case 0:
                return selectSearchByTitle(queryString);
            case 1:
                return selectSearchByNick(queryString);
            case 2:
                return selectSearchByGenre(queryString);
            case 3:
                return selectSearchByTag(queryString);
            default:
                return null;
        }
    }

    public List<StageDto> selectSearchByNick(String nick) {
        return sMapper.selectSearchByNick(nick);
    }

    public List<StageDto> selectSearchByTitle(String title) {
        return sMapper.selectSearchByTitle(title);
    }

    public List<StageDto> selectSearchByGenre(String queryString) {
        List<String> queryStrings = Arrays.stream(queryString.split(","))
                .map(String::trim)
                .filter(str -> !str.isEmpty())
                .collect(Collectors.toList());
        return sMapper.selectSearchByGenre(queryStrings);
    }

    public List<StageDto> selectSearchByTag(String queryString) {
        List<String> queryStrings = Arrays.stream(queryString.split(","))
                .map(String::trim)
                .filter(str -> !str.isEmpty())
                .collect(Collectors.toList());
        return sMapper.selectSearchByTag(queryStrings);
    }
}
