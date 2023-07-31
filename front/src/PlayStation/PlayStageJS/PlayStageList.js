import React, { useCallback, useEffect, useRef, useState } from "react";
import '../PlayStageCss/s-l-p.css';
import SLPFollowBackIcon from '../PlayStageImage/Icon/SLPFollowBackIcon.svg';
import SLPFollowNextIcon from '../PlayStageImage/Icon/SLPFollowNextIcon.svg';
import StageItemBig from "./StageItemBig";
import ResultItem from "./ResultItem";
import CreateStageModal from "./CreateStageModal.js";
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from "./PlayStageSearchBar.js";
import StageSlide from './StageSlide.js';
import { Modal } from "@mui/material";
import CSM from "./CSM";


function PlayStageList(props) {
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  const [resItems, setResItems] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  // useEffect(() => {
  //   axios.get("/api/lv0/s/stage", { params: { curr: 1, cpp: 3} })
  //     .then(res => { setResItems(res.data); console.log(res.data); })
  //     .catch(res => console.log(res));
  // }, []);
  useEffect(() => {
    axios.get("/api/lv0/s/stage", { params: { curr: currentPage, cpp: 3} })
      .then(res => {
        setResItems(prevItems => [...prevItems, ...res.data]);
        console.log(res.data);
      })
      .catch(res => console.log(res));
  }, [currentPage]);
  
  //최신순(기본값) 인기순 토글 셀렉트
  const [type1, setType1] = useState(0);
  const [type2, setType2] = useState(0);
  const [toggleOption1, setToggleOption1] = useState(["최신순", "인기순"]);
  const [toggleOption2, setToggleOption2] = useState(["제목", "닉네임", "장르", "태그"]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [checkStage, SetCheckStage] = useState(false);
  const [confirmAccount, SetConfirmAccount] = useState(0);
  const toggle1Dropdown = () => {
    setIsOpen1(!isOpen1);
  };
  const toggle2Dropdown = () => {
    setIsOpen2(!isOpen2);
  };
  const SelectOption1 = (e) => {
    setType1(e.target.getAttribute("option"));
  }
  const SelectOption2 = (e) => {
    setType2(e.target.getAttribute("value"));
  }
  useEffect(() => {
    if (sessionStorage.getItem("data") != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  //이메일,핸드폰 인증
  const data = JSON.parse(sessionStorage.getItem("data"));

  const isAuthenticated = (data) => {
    return data.emailconfirm === 1 && data.phoneconfirm === 1;
  };
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    //로그인된 사용자 정보 가져오기(sessionStorage)
    const data = JSON.parse(sessionStorage.getItem("data"));
    if (data) {
      setShowTop(isAuthenticated(data));
    } else {
      setShowTop(false)
    }
  }, []);

  const [mo, setMo] = useState(false);
  const handleMo = () => setMo(true);
  const handleMc = () => setMo(false);

// 스크롤 이벤트 핸들러
const handleScroll = () => {
  const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
  if (isAtBottom) {
    setCurrentPage(prevPage => prevPage + 1);
    console.log('무한 스크롤 작동!');
  }
};

useEffect(() => {
  // 초기 로딩 시 스크롤 이벤트 발생시키기
  handleScroll();



  // 스크롤 이벤트 리스너 등록
  window.addEventListener("scroll", handleScroll);

  return () => {
    // 스크롤 이벤트 리스너 해제
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <div className="slp">
      <button onClick={handleMo}>sdfiojweofijsdoguierhtiordfj애옹</button>
      <Modal open={mo} onClose={handleMc}>
        <CSM types={true} />
      </Modal>
      {showTop && (
        <div className="slptop" style={{ display: 'flex' }}>
          <div className="slpmystagewrapper">
            <StageItemBig />
            {/* <div className="StageModalContainer" style={{display :(IsCheckStage ? 'flex':'none')}}>                
                <button onClick={showModal} className="button button--nina button--round-l button--text-thick button--inverted" data-text="스테이지생성">
                <span>스</span><span>테</span><span>이</span><span>지</span><span>생</span><span>성</span>
                </button>
                {modalOpen && <CreateStageModal setModalOpen={setModalOpen}/>}
        </div> */}
          </div>
          <div className="slpfollowwrapper">
            <StageSlide />
          </div>
        </div>
      )}
      <div className="slpbottom">
        <div className="slpsearchwrapper">
          <div className="slpsortwrapper">
            <div className="slpsort">
              <div className="slpsort-selectbox">
                <div className="slpsort-selectboxbody" />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 11 11"
                  fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="playlistmainsearchtoggle-icon"
                >
                  <path id="Intersect" d="M1.50972 2.35292C2.44299 4.70758 4.44138 9.36599 5.6433 9.36291C6.84522 9.35984 8.8249 4.69125 9.74872 2.33184C10.0015 1.68631 9.52123 1.00203 8.82811 1.00381L2.42499 1.02019C1.73187 1.02197 1.25438 1.70869 1.50972 2.35292Z" fill="#D7E0FF" stroke="#4147D5" stroke-width="1.5" />
                </svg>
                <div className="slpsort-selectoption" onClick={toggle1Dropdown}>{
                  toggleOption1[type1]}
                  {isOpen1 && (
                    <div className="slpsort-selectDropDownBody">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="playlistmainsearchtoggleUP-icon"
                      >
                        <path id="Intersect" d="M9.75359 8.03251C8.82635 5.67547 6.83989 1.01196 5.63797 1.01196C4.43605 1.01196 2.44442 5.67547 1.51457 8.03251C1.26016 8.67739 1.73865 9.36289 2.43177 9.36289H8.83491C9.52803 9.36289 10.0073 8.67739 9.75359 8.03251Z" fill="#D7E0FF" stroke="#4147D5" stroke-width="1.5" />
                      </svg>
                      <option className='slpsort-selectDropDown' onClick={SelectOption1} option={0}>최신순</option>
                      <option className="slpsort-selectDropDown" onClick={SelectOption1} option={1}>인기순</option>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="slpsearchwrapper">
            <SearchBar />
          </div>
        </div>
        <div className="slpresult">
        {resItems.map((v, i) => (
          <Link to={"/stage/" + v.address} key={v.id}>
            <ResultItem data={v} />
          </Link>
        ))}       
        </div>
      </div>
    </div>
  );
}
export default PlayStageList;