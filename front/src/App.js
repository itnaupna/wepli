
import './App.css';


import MainSection from "./main/MainJs/MainSection";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PlayListMain from "./PlayListMain/PlayListMain";
import PlayStage from './PlayStation/PlayStageJS/PlayStage';
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainSection/>}/>
              <Route path="/PlayListMain" element={<PlayListMain/>}/>
              <Route path="/PlayStage" element={<PlayStage/>}/>
          </Routes>
      </BrowserRouter>
  );
}



export default App;
