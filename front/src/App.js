
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PlayListMain from "./PlayListMain/PlayListMain";
import PlayListMain01PlayListRangkingMain from "./PlayListMain/PlayListMain01PlayListRangkingMain";
import PlayListMain02PlayListSearchMain from "./PlayListMain/PlayListMain02PlayListSearchMain";
import MainPage from "./main/MainPage";
import MypageMain from "./mypage/MypageMain";
import SideBar from "./sidebar/SideBar";
import MusicPlayerBar from "./musicbar/MusicPlayerBar";
import PlayListMain03MyPlayListMain from "./PlayListMain/PlayListMain03MyPlayListMain";
import PlayListDetail from "./PlayListMain/PlayListDetail";

// import { useEffect, useState } from 'react';
// import axios from 'axios';

import PlayStage from './PlayStation/PlayStageJS/PlayStage';
import PlayStageList from './PlayStation/PlayStageJS/PlayStageList';
import TestPage from './TestPage';
import {useState} from "react";
function App() {
// <<<<<<< HEAD

  return (
      <BrowserRouter>
          <SideBar/>
          {/*<MusicPlayerBar/>*/}
          <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/test" element={<TestPage/>}/>
              <Route path="/mypage" element={<MypageMain/>}/>
              <Route path="/PlayListMain" element={<PlayListMain/>}/>
              <Route path="/RankingPage" element={<PlayListMain01PlayListRangkingMain/>}/>
              <Route path="/PlayListSearch" element={<PlayListMain02PlayListSearchMain/>}/>
              <Route path="/PlayListMyPli" element={<PlayListMain03MyPlayListMain/>}/>
              <Route path="/PlayListDetail" element={<PlayListDetail/>}/>
              <Route path="/PlayStage" element={<PlayStage/>}/>
              <Route path="/PlayStageList" element={<PlayStageList/>}/>
          </Routes>
      </BrowserRouter>
  );
}



export default App;
