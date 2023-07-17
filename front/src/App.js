
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
import PlayStage from "./PlayStation/PlayStageJS/PlayStage";
import PlayStageList from "./PlayStation/PlayStageJS/PlayStageList"


function App() {

  return (
      <BrowserRouter>
          <SideBar/>
          {/*<MusicPlayerBar/>*/}
          <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/mypage" element={<MypageMain/>}/>
              <Route path="/playlistmain" element={<PlayListMain/>}/>
              <Route path="/rankingpage" element={<PlayListMain01PlayListRangkingMain/>}/>
              <Route path="/playlistsearch" element={<PlayListMain02PlayListSearchMain/>}/>
              <Route path="/playlistmypli" element={<PlayListMain03MyPlayListMain/>}/>
              <Route path="/playlistdetail" element={<PlayListDetail/>}/>
              <Route path="/playstage" element={<PlayStage/>}/>
              <Route path="/playstagelist" element={<PlayStageList/>}/>
          </Routes>
      </BrowserRouter>
  );
}



export default App;
