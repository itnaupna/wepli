import React, {useRef, useState} from 'react';
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


function SideBar(props) {

    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [FindIdModalOpen, setFindIdModalOpen] = useState(false);
    const [FindPassModalOpen,setFindPassModalOpen]=useState(false);
    const [SignUpModalOpen, setSignUpModalOpen]=useState(false);

    //로그인 모달 오픈
    const showModal=()=>{
        setModalOpen(true);
    }

    //플레이리스트 이동
    const handleListClick = () => {
        navigate('/mypage')
    };

    // 메인페이지 이동
    const handleHomeClick = () => {
        navigate('/');
    };

    // 스테이지 이동
    const handleStageClick = () => {
        navigate('/Test01');
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
                    src={cover}
                    onClick={showModal}
                />
                {modalOpen && <LoginModal setModalOpen={setModalOpen} setFindIdModalOpen={setFindIdModalOpen}
                setFindPassModalOpen={setFindPassModalOpen} setSignUpModalOpen={setSignUpModalOpen}/>}
                {FindIdModalOpen && <FindIdModal setFindIdModalOpen={setFindIdModalOpen}/>}
                {FindPassModalOpen && <FindPassModal setFindPassModalOpen={setFindPassModalOpen}/>}
                {SignUpModalOpen && <SignUpModal setSignUpModalOpen={setSignUpModalOpen}/>}
            </div>
            <div className="stageicon">
                <div className="homeoutlinebox"/>
                <img className="stageicon1" alt="" src={stage} onClick={handleStageClick}/>
            </div>
        </div>
    );
}

export default SideBar;