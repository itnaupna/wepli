
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PlayListMain from "./PlayListMain/PlayListMain";
import Test01 from "./PlayListMain/Test01";
import Test02 from "./PlayListMain/Test02";
import MainPage from "./main/MainPage";
import MypageMain from "./mypage/MypageMain";
import SideBar from "./sidebar/SideBar";
import MusicPlayerBar from "./musicbar/MusicPlayerBar";

function App() {

  return (
      <BrowserRouter>
          <SideBar/>
          <MusicPlayerBar/>
          <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/mypage" element={<MypageMain/>}/>
              <Route path="/PlayListMain" element={<PlayListMain/>}/>
              <Route path="/Test01" element={<Test01/>}/>
              <Route path="/Test02" element={<Test02/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
