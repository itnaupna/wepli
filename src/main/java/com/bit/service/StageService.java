package com.bit.service;

import java.util.List;

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

    public List<StageDto> selectStageAll() {
        return sMapper.selectStageAll();
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
}
