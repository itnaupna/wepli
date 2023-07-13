import React from 'react';
import {useNavigate} from "react-router-dom";
import "./css/sidebar.css";
import weplilogo from "./photo/weplilogo.png";
import home from "./svg/homeicon.svg";
import stage from "./svg/stageicon.svg";
import list from "./svg/musiclisticon.svg";
import cover from "./svg/albumcover.svg";
function SideBar(props) {
    const navigate = useNavigate();

    const handleListClick = () => {
        //플레이리스트 이동
        navigate('/RankingPage')
    };

    const handleHomeClick = () => {
        // 메인페이지 이동
        navigate('/');
    };

    const handleStageClick = () => {
        // 스테이지 이동
        navigate('/stage');
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
                />
            </div>
            <div className="stageicon">
                <div className="homeoutlinebox"/>
                <img className="stageicon1" alt="" src={stage}/>
            </div>
        </div>
    );
}

export default SideBar;