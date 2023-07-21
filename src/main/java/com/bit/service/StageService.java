package com.bit.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.dto.BuiltStageDto;
import com.bit.dto.MemberDto;
import com.bit.dto.StageDto;
import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.BlacklistMapper;
import com.bit.mapper.MemberMapper;
import com.bit.mapper.StageMapper;

@Service
public class StageService {
    @Autowired
    StageMapper sMapper;
    @Autowired
    MemberMapper mMapper;
    @Autowired
    BlacklistMapper blacklistMapper;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    final Map<String, BuiltStageDto> builtStages = new HashMap<>();

    public int getUserCount(String stageUrl) {
        return builtStages.getOrDefault(stageUrl, new BuiltStageDto()).getUsers().size();
    }

    public List<String> addUser(String stageUrl, String nick) {
        return builtStages.compute(stageUrl, (k, v) -> {
            if (v == null) {
                v = new BuiltStageDto();
            }
            v.getUsers().add(nick);
            return v;
        }).getUsers();
    }

    public List<String> subUser(String stageUrl, String nick) {
        return builtStages.compute(stageUrl, (k, v) -> {
            v.getUsers().remove(nick);
            return v;
        }).getUsers();
    }

    public boolean insertStage(StageDto sDto, String token) {

        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        sDto.setNick(nick);
        return sMapper.insertStage(sDto) > 0;
    }

    public void updateImg(String token, String img) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        Map<String, String> nickAndImg = new HashMap<>();
        nickAndImg.put("nick", nick);
        nickAndImg.put("img", img);
        sMapper.updateImg(nickAndImg);
    }

    public List<StageDto> selectStageAll(String token, int curr, int cpp) {
        String nick = "";
        if(token!=null)
        nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        Map<String, Object> data = new HashMap<>();
        System.out.println(nick);
        data.put("nick", nick);
        data.put("curr", (curr - 1) * cpp);
        data.put("cpp", cpp);

        List<StageDto> result = sMapper.selectStageAll(data);

        for (StageDto stage : result) {
            stage.setInfo(builtStages.getOrDefault(stage.getAddress(), new BuiltStageDto()));
        }

        return result;
    }

    public List<StageDto> selectStageFollow(String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return sMapper.selectFollowStage(nick);
    }

    public StageDto selectStageOneByAddress(String address) {
        return sMapper.selectStageOneByAddress(address);
    }

    public StageDto selectStageOneByMasterNick(String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return sMapper.selectStageOneByMasterNick(nick);
    }

    public boolean updateStage(StageDto sDto, String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        sDto.setNick(nick);
        return sMapper.updateStage(sDto) > 0;
    }

    public boolean deleteStage(String token, String pw, String title) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        
        MemberDto mDto = new MemberDto();
        mDto.setNick(nick);
        mDto.setPw(pw);

        Map<String, String> data = new HashMap<>();
        data.put("nick",nick);
        data.put("title",title);

        if (mMapper.selectCheckPasswordByNick(mDto) < 1 || sMapper.selectCheckStageTitle(data) < 1)
            return false;
        return sMapper.deleteStage(nick) > 0;
    }

    public boolean selectCheckStagePw(String token, String pw) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        Map<String, String> data = new HashMap<>();
        data.put("nick", nick);
        data.put("pw", pw);
        return sMapper.selectCheckStagePw(data) > 0;
    }

    // 스테이지 검색(통합)
    public List<StageDto> selectSearchStage(String token, String queryString, String type, boolean orderByDay, int curr,
            int cpp) {
        String typeString[] = { "title", "nick", "genre", "tag", null };

        Map<String, Object> data = new HashMap<>();
        data.put("orderByDay", orderByDay);
        data.put("curr", (curr - 1) * cpp);
        data.put("cpp", cpp);
        Map<String, List<String>> searchAndBlack = new HashMap<>();

        if (token != null && !token.equals("")) {
            String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
            List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
            if (blackTarget != null && blackTarget.size() > 0) {
                searchAndBlack.put("black", blackTarget);
            }
        }
        if (queryString != null && !queryString.equals("")) {
            List<String> queryStrings = Arrays.stream(queryString.split(","))
                    .map(String::trim)
                    .filter(str -> !str.isEmpty())
                    .collect(Collectors.toList());
            searchAndBlack.put("list", queryStrings);
        }

        return sMapper.selectSearchStage(searchAndBlack, data, typeString[(type == null ? 4 : Integer.parseInt(type))]);

    }

    // public List<StageDto> SearchStages(int type, String queryString, String
    // token) {
    // switch (type) {
    // case 0:
    // return selectSearchByTitle(queryString, token);
    // case 1:
    // return selectSearchByNick(queryString, token);
    // case 2:
    // return selectSearchByGenre(queryString, token);
    // case 3:
    // return selectSearchByTag(queryString, token);
    // default:
    // return null;
    // }
    // }

    // public List<StageDto> selectSearchByTitle(String queryString, String token) {
    // Map<String, List<String>> searchAndBlack = new HashMap<>();

    // if (token != null && !token.equals("")) {
    // String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
    // List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
    // searchAndBlack.put("black", blackTarget);
    // }
    // List<String> queryStrings = Arrays.stream(queryString.split(","))
    // .map(String::trim)
    // .filter(str -> !str.isEmpty())
    // .collect(Collectors.toList());
    // searchAndBlack.put("list", queryStrings);
    // return sMapper.selectSearchByTitle(searchAndBlack);
    // }

    // public List<StageDto> selectSearchByNick(String queryString, String token) {
    // Map<String, List<String>> searchAndBlack = new HashMap<>();

    // if (token != null && !token.equals("")) {
    // String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
    // List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
    // searchAndBlack.put("black", blackTarget);
    // }
    // List<String> queryStrings = Arrays.stream(queryString.split(","))
    // .map(String::trim)
    // .filter(str -> !str.isEmpty())
    // .collect(Collectors.toList());
    // searchAndBlack.put("list", queryStrings);
    // return sMapper.selectSearchByNick(searchAndBlack);
    // }

    // public List<StageDto> selectSearchByGenre(String queryString, String token) {
    // Map<String, List<String>> searchAndBlack = new HashMap<>();

    // if (token != null && !token.equals("")) {
    // String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
    // List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
    // searchAndBlack.put("black", blackTarget);
    // }
    // List<String> queryStrings = Arrays.stream(queryString.split(","))
    // .map(String::trim)
    // .filter(str -> !str.isEmpty())
    // .collect(Collectors.toList());
    // searchAndBlack.put("list", queryStrings);
    // return sMapper.selectSearchByGenre(searchAndBlack);
    // }

    // public List<StageDto> selectSearchByTag(String queryString, String token) {
    // Map<String, List<String>> searchAndBlack = new HashMap<>();

    // if (token != null && !token.equals("")) {
    // String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
    // List<String> blackTarget = blacklistMapper.selectBlackTarget(nick);
    // searchAndBlack.put("black", blackTarget);
    // }
    // List<String> queryStrings = Arrays.stream(queryString.split(","))
    // .map(String::trim)
    // .filter(str -> !str.isEmpty())
    // .collect(Collectors.toList());
    // searchAndBlack.put("list", queryStrings);
    // return sMapper.selectSearchByTag(searchAndBlack);
    // }
}
