
import './App.css';


import MainSection from "./main/MainJs/MainSection";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PlayListMain from "./PlayListMain/PlayListMain";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainSection/>}/>
              <Route path="/PlayListMain" element={<PlayListMain/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
