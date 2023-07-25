
import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
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
import { useRecoilState } from 'recoil';
import { YoutubeAtom } from './recoil/YoutubeAtom';
import Hyukmain from "./hyukmain";
import { LoginStatusAtom } from './recoil/LoginStatusAtom';
import AddPlayLsit from "./PlayListMain/AddPlayList";
function App() {
    const [YTP, setYTP] = useRecoilState(YoutubeAtom);
    const [loginStatus,setLoginStatus] = useRecoilState(LoginStatusAtom);


    useEffect(() => {
        conSocket();
    }, []);


    return (
        <BrowserRouter>
            {YTP}
            <SideBar />
            {/* {videoInfo.isPlaying ? <MusicPlayerBar/> : null} */}
            {/*<MusicPlayerBar/>*/}
            <div className="backgroundImgDiv" />
            <Routes>
                <Route path="/" element={<MainPage />} />
                {loginStatus ? <Route path="/mypage" element={<Mypage />} /> : null}
                <Route path="/ranking" element={<PlayListMain01PlayListRangkingMain />} />
                <Route path="/pli" element={<PlayListMain02PlayListSearchMain />} />
                <Route path="/pli/:pliId" element={<PlayListDetail />}/>
                <Route path="/addpli" element={<AddPlayLsit/>} />
                <Route path="/mypli" element={<PlayListMain03MyPlayListMain />} />
                <Route path="/stage/:stageUrl" element={<PlayStage />} />
                <Route path="/stage" element={<PlayStageList />} />
                <Route path="/auth" element={<KakaoCallback />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/*" element={
                    <h1 style={{ width: "100%", textAlign: "center", marginTop: "25%", position: "absolute" }}>페이지가 없습니다</h1>
                } />
                <Route path={"/hyuk"} element={<Hyukmain/>}/>
            </Routes>
        </BrowserRouter>
    );
}



export default App;
