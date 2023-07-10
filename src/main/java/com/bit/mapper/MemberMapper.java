package com.bit.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


import com.bit.dto.MemberDto;
import com.bit.dto.MypageDto;


@Mapper
public interface MemberMapper {
    //회원가입
    public int insertJoinMember(MemberDto mDto);
    //이메일 중복검사
    public int selectCheckEmailExists(String email);
    //닉네임 중복검사
    public int selectCheckNickExists(String nick);
    //전화 중복검사
    public int selectCheckPhoneExists(String phone);
    //유저정보 받아오기
    public MemberDto selectMemberDto(String email);
    //비밀번호 확인
    public int selectCheckPasswordByEmail(MemberDto mDto);
    public int selectCheckPasswordByNick(MemberDto mDto);
    //이메일 인증여부 확인
    public int selectCheckEmailConfirm(String email);
    //전화번호 인증여부 확인
    public int selectCheckPhoneConfirm(String email);
    //이메일 인증
    public int updateEmailConfirm(String email);
    //전화번호 인증
    public int updatePhoneConfirm(String email);
    //닉넴 변경
    public int updateNick(Map<String,String> data);
    //비밀번호 변경
    public int updatePw(Map<String,String> data);
    //회원 탈퇴
    public int deleteMember(MemberDto mDto);
    //자기소개 변경
    public int updateDesc(MemberDto mDto);
    //프사 변경
    public int updateImg(MemberDto mDto);
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
    //팔로우 목록 받아오기
    public List<String> selectFollowlist(String nick);
    //팔로우 추가
    public int insertFollowlist(Map<String,String> data);
    //팔로우 삭제
    public int deleteFollowlist(Map<String,String> data);
    //마이페이지 필요데이터 읽기(뷰)
    public MypageDto selectMypageDto(String nick);



    

    public int JoinMember(MemberDto mDto);
    public int CheckEmailExists(String email);
    public int CheckNickExists(String nick);
    public MemberDto AuthLevelCheck(String nick);
    public int Login(Map<String, String> map);
    public String getNickName(String email);
}
