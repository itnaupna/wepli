
import './App.css';


import MainSection from "./main/MainJs/MainSection";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PlayListMain from "./PlayListMain/PlayListMain";
import PlayStation from "./PlayStation/PlayStationJs/PlayStation";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainSection/>}/>
              <Route path="/PlayListMain" element={<PlayListMain/>}/>
              <Route path="/PlayStation" element={<PlayStation/>}/>
          </Routes>
      </BrowserRouter>
  );
}



export default App;
