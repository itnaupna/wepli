import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [msg, setMsg] = useState('fail');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const navi = useNavigate();

//   const changeEvent=(e)=>{
//     let {name,value} = e.target;

//     setData({
//         ...data,
//         [name]:value
//     })
// }
 const onSubmitLogin=(e)=>{
        e.preventDefault();
        const url = `/api/login?email=${email}&pw=${pw}`;
        axios.get(url)
        .then(res=>{
            if(res.data.success==='yes'){
                /*
                    loacalStorage : 직접 지우기 전에는 브라우저에 남아있음
                    sessionStorage :  브라우저 닫으면 지워짐
                */
                sessionStorage.token=res.data.token;
                console.log();
                sessionStorage.email=email;
                navi("/");
                window.location.reload(); // 새로고침
            }else{
                alert("아이디나 비밀번호가 맞지 않습니다")
                sessionStorage.loginok="no";
                sessionStorage.email="";
            }
        })
    }
  
  useEffect(()=>{
    axios.get("/api/test")
    .then(res=>setMsg(res.data));

    const script = document.createElement("script");
    script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
    script.async = true;
    document.body.appendChild(script);
  },[]);

  const [nick, setNick] = useState("");

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
    <button onClick={handleClickSubmit}>전송</button><br/>


    <div id="naver_id_login">dd</div>

    <div>
      <form onSubmit={onSubmitLogin}>
      
        <input type='text' value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} /><br/>
        <input type='password'  value={pw} onChange={(e)=>{
          setPw(e.target.value)
        }} /><br/>
        <button type='submit'>로그인</button><br/>
      </form>
    </div>
    
    </div>
  );
}

export default App;
