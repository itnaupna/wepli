package com.bit.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.dto.BuiltStageDto;
import com.bit.dto.MemberDto;
import com.bit.dto.StageDto;
import com.bit.dto.StageHistoryDto;
import com.bit.dto.StageUserListDto;
import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.BlacklistMapper;
import com.bit.mapper.MemberMapper;
import com.bit.mapper.StageMapper;

import naver.cloud.NcpObjectStorageService;

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
    @Autowired
    ImgUploadService imgUploadService;
    @Autowired
    NcpObjectStorageService ncpObjectStorageService;

    public final String BUCKET_NAME = "wepli";

    private final Map<String, BuiltStageDto> builtStages = new HashMap<>();

    public int getUserCount(String stageUrl) {
        return builtStages.getOrDefault(stageUrl, new BuiltStageDto()).getUsers().size();
    }

    public void addUserToStage(String stageUrl, String sessionId) {
        builtStages.compute(stageUrl, (k,v)->{
        if(v==null){
        v = new BuiltStageDto();
        }
        v.getUsers().put(sessionId, "");
        return v;
        });
    }

    public void subUserToStage(String stageUrl, String sessionId) {
        builtStages.compute(stageUrl, (k, v) -> {
            v.getUsers().remove(sessionId);
            return v;
        });
    }

    public void setUserNickInStage(String stageUrl, String sessionId, String nick) {
        builtStages.get(stageUrl).getUsers().replace(sessionId, nick);
    }

    public String getUserNickInStage(String stageUrl, String sessionId){
        return builtStages.getOrDefault(stageUrl,new BuiltStageDto()).getUsers().get(sessionId);
    }

    private List<String> _getMembersListInStage(String stageUrl) {
        // System.out.println(builtStages.toString());
        // return null;
        return List.copyOf(builtStages.get(stageUrl).getUsers().values());
        // .stream()
        //         .filter(u -> !u.isEmpty())
        //         .collect(Collectors.toList());
    }

    public List<StageUserListDto> getMembersListInStage(String stageUrl) {
        System.out.println(_getMembersListInStage(stageUrl));
        return sMapper.selectStageUserList(_getMembersListInStage(stageUrl));
    }

    public boolean insertStage(StageDto sDto, String token) {

        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        sDto.setNick(nick);

        // Stage 주소 문자열만 허용 (공백 미허용)
        boolean checkAddress = Pattern.matches("^[\\w]*$", sDto.getAddress());
        if(!checkAddress)
           return false;

        

        if(sDto.getImg() != null && !sDto.getImg().equals("")) {
            imgUploadService.storageImgDelete(token, sDto.getImg(), "stage");
        }
        return sMapper.insertStage(sDto) > 0;
    }

    public List<StageDto> selectStageAll(String token, int curr, int cpp) {
        String nick = "";
        if (token != null)
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
        if(sDto.getImg() != null && !sDto.getImg().equals("")) {
            imgUploadService.storageImgDelete(token, sDto.getImg(), "stage");
            String img = sMapper.selectStageOneByMasterNick(nick).getImg();
            if(img != null && !img.equals("")) {
                ncpObjectStorageService.deleteFile(BUCKET_NAME, "stage", img);
            }
        }
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
        
        String img = sMapper.selectStageOneByMasterNick(nick).getImg();

        if(img != null && !img.equals("")) {
            ncpObjectStorageService.deleteFile(BUCKET_NAME, "stage", img);
        }
        
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

    public boolean insertStageHistory(StageHistoryDto shDto) {
        return sMapper.insertStageHistory(shDto) > 0;
    }

    public List<Map<String, Object>> selectStageHistory(String stageaddress){
        return sMapper.selectStageHistory(stageaddress);
    }

    public boolean selectCheckAddress(String address){
        return sMapper.selectCheckAddress(address) > 0;
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
