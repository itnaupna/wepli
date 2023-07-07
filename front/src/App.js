
import './App.css';


import MainSection from "./main/MainJs/MainSection";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PlayListMain from "./PlayListMain/PlayListMain";
import PlayStage from './PlayStation/PlayStageJS/PlayStage';
import PlayStageList from './PlayStation/PlayStageJS/PlayStageList';
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainSection/>}/>
              <Route path="/PlayListMain" element={<PlayListMain/>}/>
              <Route path="/PlayStage" element={<PlayStage/>}/>
              <Route path="/PlayStageList" element={<PlayStageList/>}/>
          </Routes>
      </BrowserRouter>
  );
}



export default App;
