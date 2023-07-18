import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./css/sidebar.css";
import weplilogo from "./photo/weplilogo.png";
import home from "./svg/homeicon.svg";
import stage from "./svg/stageicon.svg";
import list from "./svg/musiclisticon.svg";
import cover from "./svg/albumcover.svg";

import LoginModal from "../SideModal/LoginModal";
import FindIdModal from "../SideModal/FindIdModal";
import FindPassModal from "../SideModal/FindPassModal";
import SignUpModal from "../SideModal/SignUpModal";
import axios from "axios";
import PwChkModal from "../SideModal/PwChkModal";


function SideBar(props) {

    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [FindIdModalOpen, setFindIdModalOpen] = useState(false);
    const [FindPassModalOpen,setFindPassModalOpen]=useState(false);
    const [SignUpModalOpen, setSignUpModalOpen]=useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pwChkmodalOpen, setpwChkmodalOpen] = useState(false);

    // 프로필 이미지 꺼내기
    useEffect(() => {
        const storedData = window.sessionStorage.getItem('data') ||
                            window.localStorage.getItem('data');
        if (storedData) {
            setIsLoggedIn(true);
            const data = JSON.parse(storedData);
            const profileImg = data[5];
            setProfileImage(profileImg);
        }else{
            setIsLoggedIn(false);
        }
    }, []);

    //로그인 모달 오픈
    const showModal=()=>{
        setModalOpen(true);
    }

    //플레이리스트 이동
    const handleListClick = () => {
        //플레이리스트 이동
        navigate('/RankingPage')
    };

    // 메인페이지 이동
    const handleHomeClick = () => {
        navigate('/');
    };

    // 스테이지 이동
    const handleStageClick = () => {
        navigate('/Test01');
    };

    // 로그아웃
    const onLogoutSubmit = (e) => {
        e.preventDefault();
        const url = '/api/lv1/m/logout';

        axios
            .post(url)
            .then(res=>{
                sessionStorage.removeItem('data') || localStorage.removeItem('data');

                navigate("/");
                window.location.reload();
            })
    };


    // 로그인 했을때 -> 마이페이지
    // 로그인 안했을때 -> 로그인모달
    const handleProfileClick = () => {
        const isLoggedIn = sessionStorage.getItem('data') ||
                            localStorage.getItem('data');
        if (isLoggedIn) {
            showpwChkModal();
            // navigate('/mypage');
        } else {
            showModal();
        }
    };

    // 버킷 주소
    const profileimg = process.env.REACT_APP_BUCKET_URL;

    // 로고 디폴트 이미지
    const defaultporfile = weplilogo;

    const showpwChkModal = async () => {
        setpwChkmodalOpen(true);
    };

    return (
        <div className="weplisidebar">
            <div className="sidebarheader">
                <img
                    className="sideweplilogo-icon"
                    alt=""
                    src={weplilogo}
                />
            </div>
            <div className="playlisticon" onClick={handleListClick}>
                <div className="playlistoutlinebox"/>
                <img className="sideplaylisticon" alt="" src={list}/>
            </div>
            <div className="homeicon" onClick={handleHomeClick}>
                <div className="homeoutlinebox"/>
                <img className="sidehomeicon" alt="" src={home}/>
            </div>

            <div className="sidebarfooter">
                <div className="homeoutlinebox"/>
                <img
                    className="sideprofileimg-icon"
                    alt=""
                    src={isLoggedIn ? `${profileimg}/profile/${profileImage}` : defaultporfile}
                    onClick={handleProfileClick}
                />
            </div>
            {modalOpen && <LoginModal setModalOpen={setModalOpen} setFindIdModalOpen={setFindIdModalOpen}
                                      setFindPassModalOpen={setFindPassModalOpen} setSignUpModalOpen={setSignUpModalOpen}
                                        setpwChkmodalOpen={setpwChkmodalOpen}/>}
            {FindIdModalOpen && <FindIdModal setFindIdModalOpen={setFindIdModalOpen}/>}
            {FindPassModalOpen && <FindPassModal setFindPassModalOpen={setFindPassModalOpen}/>}
            {SignUpModalOpen && <SignUpModal setSignUpModalOpen={setSignUpModalOpen}/>}
            {pwChkmodalOpen && <PwChkModal setpwChkmodalOpen={setpwChkmodalOpen}/>}

            {(sessionStorage.data || localStorage.data) &&(
                <div className={'sidebarlogoutbtngroup'}>
                    <button onClick={onLogoutSubmit}
                            className={'sidebarlogoutbtn'}>로그아웃</button>
                </div>
            )}
            <div className="stageicon">
                <div className="homeoutlinebox"/>
                <img className="stageicon1" alt="" src={stage} onClick={handleStageClick}/>
            </div>

        </div>
    );
}

export default SideBar;