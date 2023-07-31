import './App.css';
import Modal from '@mui/material/Modal';

import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import PlayListMain01PlayListRangkingMain from "./PlayListMain/PlayListMain01PlayListRangkingMain";
import PlayListMain02PlayListSearchMain from "./PlayListMain/PlayListMain02PlayListSearchMain";
import MainPage from "./main/MainPage";
import SideBar from "./sidebar/SideBar";
import MusicPlayerBar from "./musicbar/MusicPlayerBar";
import PlayListMain03MyPlayListMain from "./PlayListMain/PlayListMain03MyPlayListMain";
import PlayListDetail from "./PlayListMain/PlayListDetail";
import PlayStage from "./PlayStation/PlayStageJS/PlayStage";
import PlayStageList from "./PlayStation/PlayStageJS/PlayStageList"
import TestPage from './TestPage';
import { useEffect, useState } from "react";
import KakaoCallback from "./KakaoCallback";
import Mypage from "./mypage/Mypage";
import { conSocket } from './recoil/SocketAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IsPlayingAtom, YoutubeAtom, loadVideoById } from './recoil/YoutubeAtom';
import Hyukmain from "./hyukmain";
import { isPasswordEnteredState, LoginStatusAtom } from './recoil/LoginStatusAtom';
import AddPlayLsit from "./PlayListMain/AddPlayList";
import PlayListUpdate from "./PlayListMain/PlayListUpdate";
import NaverCallback from './NaverCallback';
import MemberPage from './mypage/MemberPage';
import { LoginModalOpen, pwChkModalOpen } from './recoil/FindIdModalAtom';
import LoginModal from './SideModal/LoginModal';
import PwChkModal from './SideModal/PwChkModal';
import YouTube from 'react-youtube';
import MusicBarV2 from './MusicbarV2/MusicBarV2';

function App() {
    const [YTP, setYTP] = useRecoilState(YoutubeAtom);
    const [loginStatus, setLoginStatus] = useRecoilState(LoginStatusAtom);
    const [pwChkmodalOpen, setpwChkmodalOpen] = useRecoilState(pwChkModalOpen);
    const [loginmodalopen, setloginmodalopen] = useRecoilState(LoginModalOpen);
    const isPasswordEntered = useRecoilValue(isPasswordEnteredState);
    const [showController, setShowController] = useRecoilState(IsPlayingAtom);
    const opt = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            iv_load_policy: 3,
            volume:10,  
            // mute:1,
        }
    }


    useEffect(() => {
        conSocket();
    }, []);

    // useEffect(() => {
    //     if (YTP !== null) {
    //         // YTP.loadPlaylist(['pfUdcAvxh_Q', 'Syb1e8XsI90']);
    //         // YTP.loadVideoById('pfUdcAvxh_Q', 0);
    //         YTP.setVolume(10);
    //     }
    // }, [YTP]);


    return (
        <BrowserRouter>
            <YouTube style={{display: 'none'
            }} onReady={(e) => { setYTP(e.target); }} onStateChange={(e) => {
                setShowController(e.target.getPlayerState());
                document.title = e.target.getPlayerState();
            }} opts={opt} />
            <SideBar />
            {showController !==0 && <MusicBarV2 />}
            {/* <MusicPlayerBar/> */}
            {/* {showController  && <MusicPlayerBar/>} */}
            <div className="backgroundImgDiv" />
            <div style={{paddingBottom: showController !== 0 ? '100px' : '0'}}>
            <Routes>
                <Route path="/" element={<MainPage />} />

                {window.location.pathname === "/mypage" && loginStatus && !isPasswordEntered ?
                    setpwChkmodalOpen(true)
                     : ""
                }
                {loginStatus && isPasswordEntered ?
                    <Route path="/mypage" element={<Mypage />} /> :
                    ""
                }
                <Route path="/mypage/:userNick" element={<MemberPage />} />
                <Route path="/ranking" element={<PlayListMain01PlayListRangkingMain />} />
                <Route path="/pli" element={<PlayListMain02PlayListSearchMain />} />
                <Route path="/pli/:pliId" element={<PlayListDetail />} />
                <Route path="/pliupdate/:pliId" element={<PlayListUpdate />} />
                <Route path="/addpli" element={<AddPlayLsit />} />
                <Route path="/mypli" element={<PlayListMain03MyPlayListMain />} />
                <Route path="/stage/:stageUrl" element={<PlayStage />} />
                <Route path="/stage" element={<PlayStageList />} />
                <Route path="/auth" element={<KakaoCallback />} />
                <Route path="/nlogin" element={<NaverCallback />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/*" element={
                    <h1 style={{ width: "100%", textAlign: "center", marginTop: "25%", position: "absolute" }}>페이지가 없습니다</h1>
                } />
                <Route path={"/hyuk"} element={<Hyukmain />} />
            </Routes>
            </div>
            {pwChkmodalOpen && <PwChkModal setpwChkmodalOpen={setpwChkmodalOpen} />}
            {loginmodalopen && <LoginModal setloginmodalopen={setloginmodalopen} />}
        </BrowserRouter>
    );
}



export default App;
