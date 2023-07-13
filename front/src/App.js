
import './App.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';


import MainSection from "./main/MainJs/MainSection";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PlayListMain from "./PlayListMain/PlayListMain";
import PlayStage from './PlayStation/PlayStageJS/PlayStage';
import PlayStageList from './PlayStation/PlayStageJS/PlayStageList';
function App() {
// <<<<<<< HEAD

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainSection/>}/>
              <Route path="/PlayListMain" element={<PlayListMain/>}/>
              <Route path="/PlayStage" element={<PlayStage/>}/>
              <Route path="/PlayStageList" element={<PlayStageList/>}/>
          </Routes>
      </BrowserRouter>
//(Main Pull 해옴 주석 처리함: 2023-07-12)
//   const TESTURL = {
//     test: "/api/test",
//     join: "/api/lv0/m/member",
//     email: "/api/lv0/m/email",
//     nick: "/api/lv0/m/nick",
//     stage: "/api/lv0/s/stage",
//     mypage: "/api/lv1/m/mypage",
//     fstage: "/api/lv2/s/fstage",
//     stagesearch: "/api/lv0/s/search",
//     requestcode: "/api/lv1/m/requestcode",
//     verifycode: "/api/lv1/m/verifycode",
//     login:"/api/lv0/m/login",
//     logout:"/api/lv0/m/logout",
//   }

//   const [msg, setMsg] = useState('fail');
//   const [emailPw, setEmailPw] = useState({email: "", pw: ""});
//   // const [token, setToken] = useState("");
//   //미사용이라 주석처리해둠. 사용시 해제할것
//   useEffect(() => {
//     axios.get(TESTURL.test)
//       .then(res => setMsg(res.data));
//   }, [TESTURL.test]);

//   const [nick, setNick] = useState("");
//   const [pw, setPw] = useState("");
//   const [email, setEmail] = useState("");

//   const handleClickSubmit = async () => {
//     try {
//       const res = await axios.post(TESTURL.join, { email, pw, nick });
//       if (res.data) {
//         alert("success");
//       } else {
//         alert("fail");
//       }
//     } catch (err) {
//       alert(`err : ${err}`);
//     }
//   }

//   const handleCheckEmailExists = (e) => {
//     axios.get(TESTURL.email, { params: { email } })
//       .then(
//         res => console.log(res.data)
//       )
//   }

//   const handleCheckNickExists = (e) => {
//     axios.get(TESTURL.nick, { params: { nick } })
//       .then(
//         res => console.log(res.data)
//       )
//   }
//   const [curr, setCurr] = useState(1);
//   const [cpp, setCpp] = useState(5);

//   const [stages, setStages] = useState([]);

//   const handleShowStages = async () => {
//     try {
//       const res = await axios.get(TESTURL.stage, { params: { nick, curr, cpp } });
//       setStages(res.data);
//     } catch (err) {
//       alert(err);
//     }
//   }

//   const [myinfo, setMyinfo] = useState(
//     {
//       email: "",
//       nick: "",
//       phone: "",
//       emailconfirm: "",
//       phoneconfirm: "",
//       img: "",
//       desc: "",
//       socialtype: "",
//       lstblack: [],
//       hidechat: 0,
//       mute: 0,
//       lstfollow: [],
//       lstpli: [
//         {
//           idx: 0,
//           title: "",
//           makeday: "",
//           ispublic: 0
//         }
//       ],
//       stagetitle: "",
//       stageaddress: ""
//     }
//   );
//   const [myinfores, setMyinfores] = useState(myinfo);
//   const [infonick, setInfonick] = useState('');
//   const [lstFStages, setLstFStages] = useState([]);
//   const handleGetInfo = async () => {
//     try {
//       const res = await axios.get(TESTURL.mypage, { params: { nick: infonick } });
//       setMyinfo(res.data);
//       const ress = await axios.get(TESTURL.stage, { params: { nick: infonick, curr, cpp } });
//       setStages(ress.data);
//       const fsr = await axios.get(TESTURL.fstage, { params: { nick: infonick } });
//       setLstFStages(fsr.data);
//     } catch (error) {
//       alert(error);
//     }
//   }
//   useEffect(() => {
//     try {
//       myinfo.lstblack = JSON.parse(myinfo.lstblack);
//       myinfo.lstfollow = JSON.parse(myinfo.lstfollow);
//       myinfo.lstpli = JSON.parse(myinfo.lstpli);
//       setMyinfores(myinfo);
//       console.log(myinfo);
//     } catch (err) {
//       //console.log(err);
//     }
//   }, [myinfo])

//   const [st, setSt] = useState(0);
//   const [ss, setSs] = useState('');
//   const [searchResult, setSearchResult] = useState([]);
//   const handleStageSearch = async () => {
//     try {
//       const res = await axios.get(TESTURL.stagesearch, { params: { type: st, queryString: ss } });
//       setSearchResult(res.data);
//     } catch (error) {
//       alert(error);
//     }
//   }

//   const [verifyKey, setVerifyKey] = useState('');
//   const [verifyCode, setVerifyCode] = useState('');
//   const [verifyType, setVerifyType] = useState(0);
//   const [resultRV, setResultRV] = useState(false);
//   const [resultVerify, setResultVerify] = useState(false);

//   const handleRequestCode = async () => {
//     try {
//       const res = await axios.post(TESTURL.requestcode, { type: verifyType, key: verifyKey });
//       setResultRV(res.data);
//     } catch (error) {
//       alert(error);
//     }
//   }
//   const handleVerifyCode = async ()=>{
//     try{
//       const res = await axios.post(TESTURL.verifycode,{type:verifyType,key:verifyKey,code:verifyCode});
//       setResultVerify(res.data);
//     }catch(error){
//       alert(error);
//     }
//   }



//   const handleAccess = () => {
//     axios.post(TESTURL.login, emailPw)
//     .then(res => {
//       console.log(res.data);
//     })
//   }

//   const handleLogout = () => {
//     axios.post(TESTURL.logout)
//     .then(res => {
//       console.log("33");
//     })
//   }

//   return (
//     <div className="App">
//       {msg}<br />
//       <div style={{ border: '3px solid blue', margin: '15px' }}>
//         회원가입<br />
//         <input placeholder='이메일' value={email} onChange={(e) => { setEmail(e.target.value) }} onBlur={handleCheckEmailExists} /><br />
//         <input placeholder='비번' value={pw} onChange={(e) => { setPw(e.target.value) }} /><br />
//         <input placeholder='닉넴' value={nick} onChange={(e) => { setNick(e.target.value) }} onBlur={handleCheckNickExists} /><br />
//         <button onClick={handleClickSubmit}>전송</button>
//       </div>
//       <div style={{ border: '3px solid green', margin: '15px', display: 'none' }}>
//         비회원 기준 스테이지 페이징<br />
//         <button onClick={handleShowStages}>출력</button>
//         {stages.map((item, idx) =>
//           <div>
//             <b>{item.title}</b> by {item.nick}
//           </div>
//         )}
//       </div>
//       <div style={{ border: '3px solid red', margin: '15px' }}>
//         특정 유저 시점 스테이지 출력(블랙, 팔로우)<br />
//         페이지 : <input placeholder='페이지' value={curr} onChange={(e) => { setCurr(+e.target.value) }} /> &nbsp;
//         페이지당 : <input placeholder='페이지당 갯수' value={cpp} onChange={(e) => { setCpp(+e.target.value) }} /><br />
//         <input placeholder='닉네임(빈칸시 비회원)' value={infonick} onChange={(e) => { setInfonick(e.target.value); }} /> <button onClick={handleGetInfo}>출력</button>
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <div style={{ border: '1px solid black', margin: '10px', padding: '5px' }}>
//             <b>팔로우</b><hr />
//             {myinfores.lstfollow?.length > 0 ?
//               myinfores.lstfollow.map((item, idx) => <p>{item}</p>) :
//               null
//             }
//           </div>
//           <div style={{ border: '1px solid black', margin: '10px', padding: '5px' }}>
//             <b>블랙</b><hr />
//             {myinfores.lstblack?.length > 0 ?
//               myinfores.lstblack.map((item, idx) => <p>{item}</p>) :
//               null
//             }
//           </div>
//         </div>
//         <hr /><div style={{ display: 'flex', justifyContent: 'center' }}>
//           <div style={{ border: '1px solid black', margin: '10px', padding: '5px' }}>
//             <b>팔로우 스테이지</b><hr />
//             {lstFStages?.length > 0 ?
//               lstFStages.map((item, idx) =>
//                 <div>
//                   <b>{item.title}</b> by {item.nick}
//                 </div>
//               ) :
//               null}
//           </div>
//           <div style={{ border: '1px solid black', margin: '10px', padding: '5px' }}>
//             <b>최신순 스테이지(블랙제외 / 팔로우 포함? 제외?)</b><hr />
//             {stages.map((item, idx) =>
//               <div>
//                 <b>{item.title}</b> by {item.nick}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div style={{ border: '3px solid green', margin: '15px' }}>
//         스테이지 목록 검색<br />
//         <select defaultValue={st} onChange={(e) => setSt(+e.target.selectedIndex)}>
//           <option>제목</option>
//           <option>닉넴</option>
//           <option>장르</option>
//           <option>태그</option>
//         </select>
//         <input value={ss} onChange={(e) => setSs(e.target.value)} placeholder='검색어 입력 / 장르, 태그는 (, 쉼표)로 구분' style={{ width: '400px' }} />
//         <button onClick={handleStageSearch}>검색</button>
//         {searchResult?.length > 0 ?
//           searchResult.map((item, idx) =>
//             <div key={idx}>
//               {item.title} / {item.nick} / {item.genre} / {item.tag}
//             </div>) :
//           <div>검색결과가 없습니다.</div>}
//       </div>
//       <div style={{ border: '3px solid cyan', margin: '15px' }}>
//         인증코드 발송
//         <select defaultValue={verifyType} onChange={(e) => setVerifyType(e.target.selectedIndex.toString())}>
//           <option>이메일(미작동)</option>
//           <option>문자</option>
//         </select>
//         <input placeholder='수신자' value={verifyKey} onChange={(e) => setVerifyKey(e.target.value)} />
//         <button onClick={handleRequestCode}>발송</button>
//         {
//           resultRV ?
//             "발송성공" :
//             "발송실패 또는 내역없음"
//         }
//         <hr />
//         인증코드 검증
//         <input placeholder='코드' value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} />
//         <button onClick={handleVerifyCode}>검증</button>
//         {
//           resultVerify?
//           "인증성공":
//           "인증실패"
//         }
//       </div>
//       {msg}<br/>

//     <input value={email} onChange={(e)=>{setEmail(e.target.value)}} onBlur={handleCheckEmailExists}/><br/>
//     <input value={pw} onChange={(e)=>{setPw(e.target.value)}}/><br/>
//     <input value={nick} onChange={(e)=>{setNick(e.target.value)}} onBlur={handleCheckNickExists}/><br/>
//     <button onClick={handleClickSubmit}>전송</button>
//     <div id="naver_id_login">dd</div>
//       <input type="text"  onChange={(e)=>{setEmailPw({
//         ...emailPw,
//         email: e.target.value})}}></input>
//       <input type="password"  onChange={(e)=>{setEmailPw({
//         ...emailPw,
//         pw: e.target.value})}}></input><br/>
//         {emailPw.email}<br/>
//         {emailPw.pw}<br/>
//       <button type="button" onClick={handleAccess}>로그인</button>
//       <button type="button" onClick={handleLogout}>로그아웃</button>
//     </div>
// >>>>>>> 355070dafd16dec8469a259fe0893103bbae1d38
  );
}



export default App;
