
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
import { conSocket } from './recoil/SocketAtom';
import {useRecoilState, useRecoilValue} from 'recoil';
import { YoutubeAtom } from './recoil/YoutubeAtom';
import Hyukmain from "./hyukmain";
import {isPasswordEnteredState, LoginStatusAtom} from './recoil/LoginStatusAtom';
import AddPlayLsit from "./PlayListMain/AddPlayList";
import PlayListUpdate from "./PlayListMain/PlayListUpdate";
import NaverCallback from './NaverCallback';
import MemberPage from './mypage/MemberPage';
import { LoginModalOpen, pwChkModalOpen } from './recoil/FindIdModalAtom';
import LoginModal from './SideModal/LoginModal';
import PwChkModal from './SideModal/PwChkModal';
import { UrlChk } from './recoil/MypageModalAtom';
import Mypage1 from "./mypage/mypage1";
import UserMypage from "./mypage/UserMypage";
import MainSection1 from "./main/MainSection1";
function App() {
    const [YTP, setYTP] = useRecoilState(YoutubeAtom);
    const [loginStatus,setLoginStatus] = useRecoilState(LoginStatusAtom);
    const [pwChkmodalOpen, setpwChkmodalOpen] = useRecoilState(pwChkModalOpen);
    const [loginmodalopen, setloginmodalopen] = useRecoilState(LoginModalOpen);
    const isPasswordEntered = useRecoilValue(isPasswordEnteredState);
    const URLchk = useRecoilValue(UrlChk);


    useEffect(() => {
        console.log("Appjs ->", URLchk);
        conSocket();
    }, []);



    return (
        <BrowserRouter>
            {YTP}
            <SideBar />
            {/* {videoInfo.isPlaying ? <MusicPlayerBar/> : null} */}
            {/*<MusicPlayerBar/>*/}
            {/*<div className="backgroundImgDiv" />*/}
            <Routes>
                <Route path="/" element={<MainPage />} />

                {URLchk == "/mypage" && loginStatus && !isPasswordEntered? 
                    setpwChkmodalOpen(true)
                     : ""
                }
                {loginStatus && isPasswordEntered ?
                    <Route path="/mypage" element={<Mypage1 />} /> :
                    ""
                }
                {/*<Route path="/mypage/:userNick" element={<MemberPage/>}/>*/}
                <Route path="/mypage/:userNick" element={<UserMypage/>}/>
                <Route path="/ranking" element={<PlayListMain01PlayListRangkingMain />} />
                <Route path="/pli" element={<PlayListMain02PlayListSearchMain />} />
                <Route path="/pli/:pliId" element={<PlayListDetail/>}/>
                <Route path="/pliupdate/:pliId" element={<PlayListUpdate/>}/>
                <Route path="/addpli" element={<AddPlayLsit/>} />
                <Route path="/mypli" element={<PlayListMain03MyPlayListMain />} />
                <Route path="/stage/:stageUrl" element={<PlayStage />} />
                <Route path="/stage" element={<PlayStageList />} />
                <Route path="/auth" element={<KakaoCallback />} />
                <Route path="/nlogin" element={<NaverCallback />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/*" element={
                    <h1 style={{ width: "100%", textAlign: "center", marginTop: "25%", position: "absolute" }}>페이지가 없습니다</h1>
                } />
                <Route path={"/hyuk"} element={<Hyukmain/>}/>
                <Route path={"/m1"} element={<MainSection1/>}/>
            </Routes>

            {pwChkmodalOpen && <PwChkModal setpwChkmodalOpen={setpwChkmodalOpen} />}
            {loginmodalopen && <LoginModal setloginmodalopen={setloginmodalopen} />}
        </BrowserRouter>
    );
}



export default App;
