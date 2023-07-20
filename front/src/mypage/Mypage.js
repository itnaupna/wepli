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

function Mypage(props) {


    const data = sessionStorage.getItem('data') || localStorage.getItem('data');
    console.log("d",data);
    let nick = '';
    let profile = '';
    if (data) {
        const parsedData = JSON.parse(data);
        nick = parsedData[1];
        profile = parsedData[5];
        console.log(nick);
    }

    const profileimg = process.env.REACT_APP_BUCKET_URL;

    const [isOutMemberModalOpen, setIsOutMemberModalOpen] = useState(false);
    const [isInfoChangeModalOpen, setIsInfoChangeModalOpen] = useState(false);
    const [isEmailConfirmModalOpen, setisEmailConfirmModalOpen] = useState(false);
    const [isPhoneConfirmModalOpen, setisPhoneConfirmModalOpen] = useState(false);
    const [isBlackListOptionModalOpen, setisBlackListOptionModalOpen] = useState(false);
    const [isFollowListModalOpen, setisFollowListModalOpen] = useState(false);
    const [memberProfile, setmemberProfile] = useState();
    const [myinfo, setMyinfo] = useState(
        {
            email: "",
            nick: "",
            phone: "",
            emailconfirm: "",
            phoneconfirm: "",
            img: "",
            desc: "",
            socialtype: "",
            lstblack: [],
            hidechat: 0,
            mute: 0,
            lstfollow: [],
            lstpli: [
                {
                    idx: 0,
                    title: "",
                    makeday: "",
                    ispublic: 0
                }
            ],
            stagetitle: "",
            stageaddress: ""
        }
    );

    console.log(myinfo);
    const [infonick, setInfonick] = useState('');

    const handleGetInfo = async () => {
        const mypage = "/api/lv1/m/mypage";

        try {
            const res = await axios.get(mypage, { params: { nick: infonick } });
            console.log("마페이지 인포",res);
            console.log("마페이지 인포",res.data);
            setMyinfo(res.data);

        } catch (error) {
            alert(error);
        }
    }


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
        const url ="/api/lv1/m/profile";
        uploadFile.append("upload", e.target.files[0]);
        console.log(e.target.files[0]);
        axios({
            method: "post",
            url: url,
            data: uploadFile,
            headers: {"Content-Type" : "multipart/form-data"}
        }).then(res => {
            setmemberProfile(res.data);
        })
    }

    return (
        <div>
            <div className="mypageframe">
                <div className="mypagelogoheader">
                    <div className="mypagemembernicknameframe">
                        <div className="memebersmypage">{nick}님 마이페이지</div>
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
                        <button type={'button'} onClick={handleGetInfo}>ddddx</button>
                        <div className="mypagechangeinfobox" onClick={showEmailConfirmModal}>
                            <div className="mypagechangeinfobutton">
                                <div className="mypagechangeinfosurface"/>
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
                                안녕하세요 저는 인디음악을 좋아해요 오늘도 좋은하루 보내세요
                            </div>
                        </div>
                        <div className="mypageonelinerbox">
                            <div className="mypageonelinertext">한줄소개</div>
                            <img
                                className="mypagecommunicationicon"
                                alt=""
                                src={message}
                            />
                        </div>
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
                        src={`${profileimg}/profile/${profile}`}
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