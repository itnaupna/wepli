import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import PlayListMain from "./PlayListMain/PlayListMain";

function App() {
  const [msg, setMsg] = useState('fail');
  
  useEffect(()=>{
    axios.get("/api/test")
    .then(res=>setMsg(res.data));
  },[])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {msg}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      <PlayListMain/>
      </header>
    </div>
  );
}

export default App;
