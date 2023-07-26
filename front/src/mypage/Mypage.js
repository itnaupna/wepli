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
import {useRecoilState} from "recoil";
import {LoginStatusAtom, ProfileImageUrl, UserStorageDesc} from "../recoil/LoginStatusAtom";
import {BlackMemberAtom, FollowMemberAtom, TargetMemberAtom} from "../recoil/FollowAtom";
import {
    BlackListModalOpen,
    BlackListOptionModalOpen,
    EmailConfirmModalOpen,
    FollowModalOpen,
    InfoChangeModalOpen,
    OutMemberModalOpen, PhoneConfirmModalOpen, TargetListModalOpen
} from "../recoil/MypageModalAtom";
import FollowerListModal from "../MypageModal/FollowerListModal";
import BlackListModal from "../MypageModal/BlackListModal";

function Mypage(props) {


    const data = sessionStorage.getItem('data') || localStorage.getItem('data');
    let userNick = '';
    let profile = '';

    if (data) {
        const parsedData = JSON.parse(data);
        userNick = parsedData.nick;
        profile = parsedData.img;
        console.log(userNick);
    }

    const parse = JSON.parse(data);
    const usernick = parse.nick;
    const userdesc = parse.desc;

    const parsedData = JSON.parse(data);
    const emailconfirm = parsedData.emailconfirm;
    const phoneconfirm = parsedData.phoneconfirm;


    const bucket = process.env.REACT_APP_BUCKET_URL;

    const [isOutMemberModalOpen, setIsOutMemberModalOpen] = useRecoilState(OutMemberModalOpen);
    const [isInfoChangeModalOpen, setIsInfoChangeModalOpen] = useRecoilState(InfoChangeModalOpen);
    const [isEmailConfirmModalOpen, setisEmailConfirmModalOpen] = useRecoilState(EmailConfirmModalOpen);
    const [isPhoneConfirmModalOpen, setisPhoneConfirmModalOpen] = useRecoilState(PhoneConfirmModalOpen);
    const [isBlackListOptionModalOpen, setisBlackListOptionModalOpen] = useRecoilState(BlackListOptionModalOpen);
    const [isFollowListModalOpen, setisFollowListModalOpen] = useRecoilState(FollowModalOpen);
    const [isTargetListModalOpen, setisTargetListModalOpen] = useRecoilState(TargetListModalOpen);
    const [isBlackListModalOpen, setisBlackListModalOpen] = useRecoilState(BlackListModalOpen);
    const [memberProfile, setmemberProfile] = useState('');
    const [loginStatus, setLoginStatus] = useRecoilState(LoginStatusAtom);
    const [profileImageUrl, setProfileImageUrl] = useRecoilState(ProfileImageUrl);
    const [followMember, setFollowMember] = useRecoilState(FollowMemberAtom);
    const [targetMember, setTargetMember] = useRecoilState(TargetMemberAtom);
    const [blackMember, setBlackMember] = useRecoilState(BlackMemberAtom);
    const [desc, setUserDescInput] = useState('');
    const [value, setvalue] = useState("");
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
        const url = "/api/lv2/f/follow";

        axios
            .get(url).then(res => {
            setFollowMember(res.data);
            console.log("follow 멤버", res.data);
        });
    }

    const showTargetListModal = () => {
        setisTargetListModalOpen(true);

        const url = "/api/lv2/f/follower";

        axios
            .get(url)
            .then(res => {
                setTargetMember(res.data);
                console.log("여기가 팔로워 출력"+setTargetMember);
                console.log("팔로워 출력",res);
            });
    }

    const showBlackListModal = (target) =>{
        setisBlackListModalOpen(true);
        setvalue(target);
        const url = "/api/lv2/b/blacklist";

        axios
            .get(url)
            .then(res => {
                setBlackMember(res.data);
                console.log("블랙리스트 출력Mypage" ,res);
                console.log("블랙리스트 출력Mypage" + setBlackMember);
            })
    }


    const memberProfileChange = (e) => {
        const uploadFile = new FormData();
        const url = "/api/lv1/m/profile";
        uploadFile.append("upload", e.target.files[0]);

        axios({
            method: "post",
            url: url,
            data: uploadFile,
            headers: {"Content-Type": "multipart/form-data"}
        }).then(res => {
            const mypageurl = "/api/lv0/m/mypage";
            axios({
                method: "get",
                url: mypageurl,
                data: {userNick: userNick},
            }).then(res => {
                if (res.data) {
                    const storedData = JSON.parse(sessionStorage.getItem("data") || localStorage.getItem("data")) || {};
                    storedData.img = res.data.img;

                    const newData = JSON.stringify(storedData);
                    sessionStorage.setItem("data", newData);

                    setProfileImageUrl(res.data.img);
                } else {
                    alert("꽝");
                }
            });
        });
    };


    const [userStorageDesc, setUserStorageDesc] = useRecoilState(UserStorageDesc);

    const handleDescChange = async () => {
        const url = "/api/lv1/m/desc";
        axios({
            method: "patch",
            url: url,
            data: JSON.stringify({"desc": desc}),
            headers: {'Content-Type': 'application/json'},
        }).then(res => {
            const mypageurl = "/api/lv0/m/mypage";
            const data = {userNick: userNick}
            axios
                .get(mypageurl, data)
                .then(res => {
                    if (res.data) {
                        const storedData = JSON.parse(sessionStorage.getItem("data") || localStorage.getItem("data")) || {};
                        console.log("storedData desc true" + storedData);
                        storedData.desc = res.data.desc;

                        const newData = JSON.stringify(storedData);
                        sessionStorage.setItem("data", newData);
                        setUserStorageDesc(res.data.desc);
                        alert("변경됨");
                    } else {
                        alert("변경안됨");
                    }
                })
        })
    }

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

                        {emailconfirm === 1 ?
                            <div className="mypagechangeinfobox" onClick={showEmailConfirmModal}>
                                <div className="mypagechangeinfobutton">
                                    <div className="mypagechangeinfosurface"/>
                                    <div className="mypageemailsendlabel">이메일 인증됨</div>
                                </div>
                            </div> :
                            <div className="mypagechangeinfobox" onClick={showEmailConfirmModal}>
                                <div className="mypagechangeinfobutton">
                                    <div className="mypagechangeinfosurface"/>
                                    <div className="mypageemailsendlabel">이메일 인증</div>
                                </div>
                            </div>
                        }

                        {phoneconfirm === 1 ?
                            <div className="mypagechangeinfobox" onClick={showPhoneConfirmModal}>
                                <div className="mypagechangeinfobutton">
                                    <div className="mypagechangeinfosurface"/>
                                    <div className="mypageemailsendlabel">휴대폰 인증됨</div>
                                </div>
                            </div>
                            :
                            <div className="mypagechangeinfobox" onClick={showPhoneConfirmModal}>
                                <div className="mypagechangeinfobutton">
                                    <div className="mypagechangeinfosurface"/>
                                    <div className="mypageemailsendlabel">휴대폰 인증</div>
                                </div>
                            </div>
                        }

                        <div className="mypagechangeinfobox" onClick={showBlackListOptionModal}>
                            <div className="mypagechangeinfobutton">
                                <div className="mypagechangeinfosurface"/>
                                <div className="mypageblacklistlabel">블랙리스트 설정</div>
                            </div>
                        </div>
                        <div className="mypagechangeinfobox" onClick={showOutMemberModal}>
                            <div className="mypagechangeinfobutton">
                                <div className="mypagechangeinfosurface"/>
                                <div className="mypagesecessionlabel">회원탈퇴</div>
                            </div>
                        </div>
                    </div>
                    <div className="mypagemyinfoboxframe">
                        <div className="mypageonelineinfotext">
                            <div className="mypageonelinetext">
                                {userdesc}
                            </div>
                        </div>

                        <div >
                            <div className="userdescchangesection">
                                <input
                                    className={'userdescinput'}
                                    type="text"
                                    value={desc}
                                    onChange={(e) => setUserDescInput(e.target.value)}
                                />
                                <div className="userdescchangebtngroup">
                                    <button type="button" onClick={handleDescChange} className="userdescchangebtn">
                                        변경
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mypageonelinerbox">
                            <div className="mypageonelinertext">한줄소개</div>
                            <div className={'mypageonelinersubtext'}>메세지를 클릭하여 수정할 수 있습니다</div>
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
                        <div className="mypagefollowbox" onClick={showTargetListModal}>
                            <div className="mypagefollowtext">팔로워</div>
                            <div className="mypagefollownumber">1200명</div>
                        </div>
                        <div className={'mypageblacklistfrmae'} onClick={showBlackListModal}>
                            <div className={'mypageblacklistfrmae'}>블랙</div>
                        </div>
                    </div>

                </div>
                <div className="mypagememberprofileframe">

                    <img
                        className="mypagememberprofileimg-icon"
                        alt=""
                        src={loginStatus && profileImageUrl ? `${bucket}/profile/${profileImageUrl}` : logo }
                    />

                    <input
                        type="file"
                        id="profileUpload"
                        className="file-input"
                        onChange={memberProfileChange}
                    />
                </div>
                {isBlackListModalOpen && <BlackListModal setisBlackListModalOpen={setisBlackListModalOpen}/>}
                {isTargetListModalOpen && <FollowerListModal setisTargetListModalOpen={setisTargetListModalOpen}/>}
                {isOutMemberModalOpen && <OutMemberModal setIsOutMemberModalOpen={setIsOutMemberModalOpen}/>}
                {isInfoChangeModalOpen && <InfoChageModal setIsInfoChangeModalOpen={setIsInfoChangeModalOpen}/>}
                {isEmailConfirmModalOpen &&
                    <EmailConfirmModal setisEmailConfirmModalOpen={setisEmailConfirmModalOpen}/>}
                {isPhoneConfirmModalOpen &&
                    <PhoneConfirmModal setisPhoneConfirmModalOpen={setisPhoneConfirmModalOpen}/>}
                {isBlackListOptionModalOpen &&
                    <BlackListOptionModal setisBlackListOptionModalOpen={setisBlackListOptionModalOpen}/>}
                {isFollowListModalOpen && (
                    <FollowListModal
                        setisFollowListModalOpen={setisFollowListModalOpen}
                        followMember={followMember}
                    />
                )}

            </div>
        </div>
    );
}

export default Mypage;