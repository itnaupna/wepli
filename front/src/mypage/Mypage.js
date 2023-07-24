import React, {useEffect, useState} from 'react';
import "./css/Mypage.css";
import message from "./svg/message.svg";
import logo from "./photo/wplieonlylogo.png";
import OutMemberModal from "../MypageModal/OutMemberModal";
import InfoChageModal from "../MypageModal/InfoChageModal";
import EmailConfirmModal from "../MypageModal/EmailConfirmModal";
import PhoneConfirmModal from "../MypageModal/PhoneConfirmModal";
import BlackListOptionModal from "../MypageModal/BlackListOptionModal";
import FollowListModal from "../MypageModal/FollowListModal";
import axios from "axios";
import {useRecoilState, useRecoilValue} from "recoil";
import {DataState, LoginStatusAtom, ProfileImageUrl, profileImageUrl} from "../recoil/LoginStatusAtom";

function Mypage(props) {


    const data = sessionStorage.getItem('data') || localStorage.getItem('data');
    console.log("d",data);
    let userNick = '';
    let profile = '';
    if (data) {
        const parsedData = JSON.parse(data);
        userNick = parsedData.nick;
        profile = parsedData.img;
        console.log(userNick);
    }

    const parse= JSON.parse(data);
    const nick = parse.nick;
    const desc = parse.desc;
    console.log("자기소개 나오는지"+desc);
    const parsedData = JSON.parse(data);
    const emailconfirm = parsedData.emailconfirm;
    console.log(emailconfirm);
    console.log("제이슨",nick);


    const bucket = process.env.REACT_APP_BUCKET_URL;

    const [isOutMemberModalOpen, setIsOutMemberModalOpen] = useState(false);
    const [isInfoChangeModalOpen, setIsInfoChangeModalOpen] = useState(false);
    const [isEmailConfirmModalOpen, setisEmailConfirmModalOpen] = useState(false);
    const [isPhoneConfirmModalOpen, setisPhoneConfirmModalOpen] = useState(false);
    const [isBlackListOptionModalOpen, setisBlackListOptionModalOpen] = useState(false);
    const [isFollowListModalOpen, setisFollowListModalOpen] = useState(false);
    const [memberProfile, setmemberProfile] = useState('');
    const [loginStatus,setLoginStatus] = useRecoilState(LoginStatusAtom);
    const [profileImageUrl, setProfileImageUrl] = useRecoilState(ProfileImageUrl);

    const showOutMemberModal = () => {
        setIsOutMemberModalOpen(true);
    };

    const showInfoChangeModal = () => {
        setIsInfoChangeModalOpen(true);
    }

    const showEmailConfirmModal = () => {
        setisEmailConfirmModalOpen(true);
    }

    const showPhoneConfirmModal = () => {
        setisPhoneConfirmModalOpen(true);
    }

    const showBlackListOptionModal = () => {
        setisBlackListOptionModalOpen(true);
    }

    const showFollowListModal = () => {
        setisFollowListModalOpen(true);
    }


    const memberProfileChange = (e) => {
        const uploadFile = new FormData();
        const url = "/api/lv1/m/profile";
        uploadFile.append("upload", e.target.files[0]);

        axios({
            method: "post",
            url: url,
            data: uploadFile,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
            const mypageurl = "/api/lv1/m/mypage";
            axios({
                method: "get",
                url: mypageurl,
                data: { userNick: nick },
            }).then(res => {
                if (res.data) {
                    console.log("if res", res);
                    console.log("if data", res.data);
                    const storedData = JSON.parse(sessionStorage.getItem("data") || localStorage.getItem("data")) || {};
                    storedData.img = res.data.img;

                    const newData = JSON.stringify(storedData);
                    console.log("이미지" + newData);
                    sessionStorage.setItem("data", newData);

                    setProfileImageUrl(res.data.img);
                } else {
                    alert("꽝");
                }
            });
        });
    };

    // const handleDescChange = async () => {
    //     const url = "/api/lv1/m/desc";
    //     axios({
    //         method: "patch",
    //         url: url,
    //         data: {desc}
    //         }
    //     })
    // }

    useEffect(() => {
        setProfileImageUrl(profile);
    }, [profile]);


    return (
        <div>
            <div className="mypageframe">
                <div className="mypagelogoheader">
                    <div className="mypagemembernicknameframe">
                        <div className="memebersmypage">{userNick}님 마이페이지</div>

                    </div>
                    <div className="mypageweplilogobox">
                        <img
                            className="mypageweplilogo-icon"
                            alt="logo"
                            src={logo}
                        />
                    </div>
                </div>
                <div className="mypagemiddleboxgruop">
                    <div className="mypagemenubarframe">
                        <div className="mypagechangeinfobox" onClick={showInfoChangeModal}>
                            <div className="mypagechangeinfobutton">
                                <div className="mypagechangeinfosurface"/>
                                <div className="mypagechangeinfolabel">회원정보변경</div>
                            </div>
                        </div>

                                <div className="mypagechangeinfobox" onClick={showEmailConfirmModal}>
                                    <div className="mypagechangeinfobutton">
                                        <div className="mypagechangeinfosurface" />
                                        <div className="mypageemailsendlabel">이메일 인증</div>
                                    </div>
                                </div>


                        <div className="mypagechangeinfobox" onClick={showPhoneConfirmModal}>
                            <div className="mypagechangeinfobutton">
                                <div className="mypagechangeinfosurface"/>
                                <div className="mypageemailsendlabel">휴대폰 인증</div>
                            </div>
                        </div>
                        <div className="mypagechangeinfobox" onClick={showBlackListOptionModal}>
                            <div className="mypagechangeinfobutton">
                                <div className="mypagechangeinfosurface"/>
                                <div className="mypageblacklistlabel">블랙리스트 설정</div>
                            </div>
                        </div>
                        <div className="mypagechangeinfobox" onClick={showOutMemberModal}>
                            <div className="mypagechangeinfobutton">
                                <div className="mypagechangeinfosurface" />
                                <div className="mypagesecessionlabel">회원탈퇴</div>
                            </div>
                        </div>
                    </div>
                    <div className="mypagemyinfoboxframe">
                        <div className="mypageonelineinfotext">
                            <div className="mypageonelinetext">
                                {desc}
                            </div>
                        </div>
                        <button type={'button'} className="mypageonelinerbox">
                            <div className="mypageonelinertext">한줄소개</div>
                            <img
                                className="mypagecommunicationicon"
                                alt=""
                                src={message}
                            />
                        </button>
                    </div>
                    <div className="mypagefollowframe">
                        <label className="mypagefollowingbox" onClick={showFollowListModal}>
                            <div className="mypagefollowingnumber">45명</div>
                            <div className="mypagefollowingtext">팔로잉</div>
                        </label>
                        <div className="mypagefollowbox">
                            <div className="mypagefollowtext">팔로워</div>
                            <div className="mypagefollownumber">1200명</div>
                        </div>
                    </div>
                </div>
                <div className="mypagememberprofileframe">

                        <img
                            className="mypagememberprofileimg-icon"
                            alt=""
                            src={`${bucket}/profile/${profileImageUrl}`}
                        />

                    <input
                        type="file"
                        id="profileUpload"
                        className="file-input"
                        onChange={memberProfileChange}
                    />
                </div>
                {isOutMemberModalOpen && <OutMemberModal setIsOutMemberModalOpen={setIsOutMemberModalOpen}/>}
                {isInfoChangeModalOpen && <InfoChageModal setIsInfoChangeModalOpen={setIsInfoChangeModalOpen}/>}
                {isEmailConfirmModalOpen && <EmailConfirmModal setisEmailConfirmModalOpen={setisEmailConfirmModalOpen}/>}
                {isPhoneConfirmModalOpen && <PhoneConfirmModal setisPhoneConfirmModalOpen={setisPhoneConfirmModalOpen}/>}
                {isBlackListOptionModalOpen && <BlackListOptionModal setisBlackListOptionModalOpen={setisBlackListOptionModalOpen}/>}
                {isFollowListModalOpen && <FollowListModal setisFollowListModalOpen={setisFollowListModalOpen}/>}
            </div>
        </div>
    );
}

export default Mypage;