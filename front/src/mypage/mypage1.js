import React, {useEffect, useState} from 'react';
import mic from "../mic.jpg";
import "./css/mypage1.css";
import logo from './photo/wplieonlylogo.png';
import message from "./svg/message.svg";
import axios from "axios";
import {useRecoilState} from "recoil";
import {BlackListModalOpen, FollowModalOpen, TargetListModalOpen} from "../recoil/MypageModalAtom";
import {BlackMemberAtom, FollowMemberAtom, TargetMemberAtom} from "../recoil/FollowAtom";
import {LoginStatusAtom, ProfileImageUrl, UserStorageDesc} from "../recoil/LoginStatusAtom";
import FollowListModal from "../MypageModal/FollowListModal";
import BlackListModal from "../MypageModal/BlackListModal";
import FollowerListModal from "../MypageModal/FollowerListModal";

function Mypage1(props) {

    const [loginStatus, setLoginStatus] = useRecoilState(LoginStatusAtom);

    const [isFollowListModalOpen, setisFollowListModalOpen] = useRecoilState(FollowModalOpen);
    const [isTargetListModalOpen, setisTargetListModalOpen] = useRecoilState(TargetListModalOpen);
    const [isBlackListModalOpen, setisBlackListModalOpen] = useRecoilState(BlackListModalOpen);

    const [followMember, setFollowMember] = useRecoilState(FollowMemberAtom);
    const [targetMember, setTargetMember] = useRecoilState(TargetMemberAtom);
    const [blackMember, setBlackMember] = useRecoilState(BlackMemberAtom);

    const [value, setvalue] = useState("");

    const [profileImageUrl, setProfileImageUrl] = useRecoilState(ProfileImageUrl);
    const [desc, setUserDescInput] = useState('');

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
                console.log("여기가 팔로워 출력" + setTargetMember);
                console.log("팔로워 출력", res);
            });
    }

    const showBlackListModal = (target) => {
        setisBlackListModalOpen(true);
        setvalue(target);
        const url = "/api/lv2/b/blacklist";

        axios
            .get(url)
            .then(res => {
                setBlackMember(res.data);
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
                        setUserDescInput('');
                    } else {
                        alert("변경안됨");
                    }
                })
        })
    }

    const usernickStyle = {
        fontWeight: 'bold',
        color: '#5ea6ff'
    }

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(prevState => !prevState);
    };


    useEffect(() => {
        setProfileImageUrl(profile);
    }, [profile]);
    return (
        <div className="mypagemainframe">
            <div className="mypageheader">
                <div className="mypageleftheader">
                    <img src={loginStatus && profileImageUrl ? `${bucket}/profile/${profileImageUrl}` : logo}
                         alt="Profile" className="mypageuserprofile"/>
                    <input
                        type="file"
                        id="profileUpload"
                        className="file-input"
                        onChange={memberProfileChange}
                    />
                </div>
                <div className='mypagerightheader'>
                    <div className={'mypageusernickgroup'}>
                        <div className={'mypageusernick'}>
                            <span style={usernickStyle}>{userNick}</span>님의 마이페이지
                        </div>
                        <div className={'mypagewepliloggroup'}>
                            <img src={logo} alt={'logo'} className={'mypageweplilogo'}/>
                        </div>
                    </div>
                    {/*팔로잉리스트*/}
                    <div className={'mypagefollowinggroup'}>
                        <div className={'mypagefollowing'} onClick={showFollowListModal}>
                            <div className={'mypagefollowtext1'}>팔로잉</div>
                        </div>
                    </div>
                    {/*팔로워리스트*/}
                    <div className={'mypagefollowegroup'} onClick={showTargetListModal}>
                        <div className={'mypagefollowering'}>
                            <div className={'mypagefollowertext1'}>팔로워</div>
                        </div>
                    </div>
                    {/*블랙리스트*/}
                    <div className={'mypageblackgroup'} onClick={showBlackListModal}>
                        <div className={'mypageblacking'}>
                            <div className={'mypageblacktext1'}>블랙리스트</div>
                        </div>
                    </div>
                    <div className={'mypagedescgroup'}>
                        <div className={'mypagedesctext'}>
                            <img src={message} className={'mypagemessage'}/>
                            <div className={'mypagedesctextsection'}>
                            {userdesc}
                            </div>
                        </div>
                    </div>
                    <div className={'mypagedescsection'}>
                        <div className={"input-container"}>
                        <input className={'mypagedescinput'} type="text"
                            value={desc}
                            onChange={(e) => setUserDescInput(e.target.value)}
                        />
                            <div className="highlight"></div>
                        </div>

                        <div className="mypagedescbtngroup">
                            <button type="button" onClick={handleDescChange} className="mypagedescchangebtn">
                                <span className="button-content">변경 </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={'mypagelinergroup'}></div>
                <div className={'mypagelistmenu'}>
                    <button className="hamburger-button" onClick={handleMenuToggle}>메뉴</button>
                    <ul className={`mypageul ${isMenuOpen ? 'open' : ''}`}>
                        <li>
                            회원정보수정
                        </li>

                        <li>
                            이메일인증ㄴㄴ
                        </li>

                        <li>
                            전화번호인증
                        </li>

                        <li>
                            블랙리스트옵션
                        </li>

                        <li>
                            회원탈퇴
                        </li>
                    </ul>
                </div>
            </div>


            {isBlackListModalOpen && <BlackListModal setisBlackListModalOpen={setisBlackListModalOpen}/>}
            {isTargetListModalOpen && <FollowerListModal setisTargetListModalOpen={setisTargetListModalOpen}/>}
            {isFollowListModalOpen && (
                <FollowListModal
                    setisFollowListModalOpen={setisFollowListModalOpen}
                    followMember={followMember}
                />
            )}
        </div>
    );

}

export default Mypage1;
