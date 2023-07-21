import React, { useEffect, useRef, useState } from 'react';
import '../PlayStageCss/CreateStageModal.css';
import {useNavigate} from "react-router-dom";
import Cancel from '../PlayStageImage/Icon/Cancel.svg';
import Create from '../PlayStageImage/Icon/Create.svg';
import Logo from '../PlayStageImage/img/Logo.png';
import '../PlayStageCss/SettingModal.css';


function SettingModal({setModalOpen}) {
 // const [address,setAdress] =('');
 const [title,setTitle] = useState('');
 const [desc,setDesc] = useState('');
 const [genre,setGenre] = useState('');
 const [tag,setTag] = useState('');
 const [pw,setPw] = useState('');
 const navi = useNavigate();
 const [img, setImg] = useState('');
 const [disable,setDisable] = useState(true);
 const [isPublic,setIsPublic]= useState(true);
 //파일 업로드/미리보기 이벤트
 const onUpload = (e)=>{
     const file = e.target.files[0];
     const reader = new FileReader();
     reader.readAsDataURL(file);

     return new Promise((resolve)=>{
         reader.onload=()=>{
             setImg(reader.result || null);//파일의 컨텐츠
             resolve();
         };
     });
 }
 //Private일 경우 비밀번호 나오게 div 나오게 만들기

 const OpenPw = (e)=> {
     if(!isPublic){
         setDisable(true);
         setIsPublic(true);
         setPw('');
     }else{
         setDisable(false);
         setIsPublic(false);
         console.log({setIsPublic})
     } 
 };
 //모달 끄기
 const closeModal = () => {
     setModalOpen(false);
 };
 // const MakeStage = useNavigate("/PlayStage.js/${address}")
 //모달 외부 클릭 시 끄기 처리
 //Modal 창을 useRef로 취득
 const modalRef = useRef(null);
 useEffect(()=>{
     //이벤트 핸들러 함수
     const handler = (e) => {
         //mousedown 이벤트가 발생한 영역이 모달창이 아닐 때 , 모달창 제거 처리.
         if(modalRef.current && !modalRef.current.contains(e.target)){
             setModalOpen(false);
         }
     };
     //이벤트  핸들러 등록
     document.addEventListener('mousedown',handler);
     //모바일 버전
     document.addEventListener('touchstart',handler);
     return () =>{
         //이벤트 핸들러 해제
         document.removeEventListener('mousedown',handler);
         document.removeEventListener('touchstart',handler);//모바일
     };

 });
 //정보 기입 확인
 const handleSubmit = (e) =>{
     e.preventDefault();
     //입력 필드값 검증
     if(title === '' ||  desc ==='' || genre ==='' || tag ==='' || img === '' ){
         alert('모든 정보를 기입해주세요');//입력필드가 하나라도 비어있을 시
         console.log('success!');
         return;
     }else{
      
         setModalOpen(false);
         console.log('Create success!')
     }
 }
 return (
     <div ref={modalRef} className="createstagemodal-parent">
     <div className="createstagemodal">
       <div className="createstagemodal-inner">
         <div className="frame-child" />
       </div>
       <div className="wrapper">
         <div className="div">
           <div className="child" />
           <form onSubmit={handleSubmit}>
             <button type='submit' className='div1'>저장 완료</button>                
           </form>
         </div>
       </div>
       {/* <a href='./PlayStage.js'>
         <img className="createstagemodal-child" alt=""/>
       </a> */}
       <div className="findmodaltitle">
         <div className="wepli">WEPLi</div>
       </div>
       <div className="Makestage">Stage 설정</div>
       <div className="mypageemailmodal">
         <div className="rectangle-parent">
           <div className="group-child" />
           <div className="div2">
             <div class>
                 <img width={'60%'} src={img} alt='' className='groupChildImage'/>
             </div>
             <label className="input-file-button" for="ImageUpload">
                 업로드
             </label>
           <input accept='image/*' multiple type='file' id='ImageUpload' style={{display:'none'}}
           onChange={e=>onUpload(e)}>
           </input>
           </div>
         </div>
         
         <img
           className="mypageemailmodal-child"
           alt=""
           src={Cancel}
           onClick={closeModal}
         />
         
         <div className="rectangle-group">
           <div className="group-item" />
           <div className="container">
             <div className="div3">
                 <input type='text' placeholder='스테이지 제목' value={title} onChange={(e)=>setTitle(e.target.value)}/>
             </div>
           </div>
         </div>
         <div className="rectangle-container">
           <div className="group-inner" />
           <div className="checkbox-wrapper">
             <input type='text' className='checkboxPW' disabled={disable} placeholder='패스워드 입력'
             value={pw} onChange={(e)=>setPw(e.target.value)}/>
             <input type='checkbox' onClick={OpenPw}/>Private
             {/* <div className="checkbox-">{`공개 비공개(checkBox)->비공개 암호설정`}</div> */}
           </div>
         </div>
         <div className="group-div">
           <div className="group-inner" />
           <div className="frame">
             <input type='text' className='div4' placeholder='태그입력' value={tag} onChange={(e)=>setTag(e.target.value)}/>
           </div>
         </div>
         <div className="rectangle-parent1">
           <div className="group-inner" />
           <div className="frame">
             <input type='text' className='frameGenre' placeholder='장르입력' value={genre} onChange={(e)=>setGenre(e.target.value)}/>
           </div>
         </div>
         <div className='rectangle-parent2'>
            <div className='group-inner'/>
            <div className='frame2'>
                <input type='text' className='frameDesc' placeholder='스테이지 소개글을 작성해주세요' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            </div>
         </div>
       </div>
       <img
         className="wplieonlylogo-4-icon"
         alt=""
         src={Logo}
       />
     </div>
   </div>
    );
}

export default SettingModal;