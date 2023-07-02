import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [msg, setMsg] = useState('fail');
  
  useEffect(()=>{
    axios.get("/api/test")
    .then(res=>setMsg(res.data));

    const script = document.createElement("script");
    script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
    script.async = true;
    document.body.appendChild(script);
  },[]);

  const [nick, setNick] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");

  const handleClickSubmit = ()=>{
    axios.post("/api/member",null,{params:{email,pw,nick}})
    .then(
      res=>console.log(res.data)
    )
    .catch(
      err=>alert(err.response.data)
    )
  }

  const handleCheckEmailExists = (e)=>{
    axios.get(`/api/email?email=${email}`)
    .then(
      res=>console.log(res.data)
    )
  }
  
  const handleCheckNickExists = (e)=>{
    axios.get(`/api/nick?nick=${nick}`)
    .then(
      res=>console.log(res.data)
    )
  }

  return (
    <div className="App">
      {msg}<br/>

    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} onBlur={handleCheckEmailExists}/><br/>
    <input value={pw} onChange={(e)=>{setPw(e.target.value)}}/><br/>
    <input value={nick} onChange={(e)=>{setNick(e.target.value)}} onBlur={handleCheckNickExists}/><br/>
    <button onClick={handleClickSubmit}>전송</button>
    <div id="naver_id_login">dd</div>
    </div>
  );
}

export default App;
