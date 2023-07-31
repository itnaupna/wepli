import React, { useEffect, useState } from 'react';
import SLPMystageLikeIcon from '../PlayStageImage/Icon/SLPMystageLikeIcon.svg';
import SLPMystagePeopleIcon from '../PlayStageImage/Icon/SLPMystagePeopleIcon.svg';
import SLPMystageQIcon from '../PlayStageImage/Icon/SLPMystageQIcon.svg';
import SLPMystagePlayingTitleIcon from '../PlayStageImage/Icon/SLPMystagePlayingTitleIcon.svg';
import CreateStageModal from "./CreateStageModal.js";
import CSM from "./CSM";
import { Modal } from "@mui/material";
import  Axios  from 'axios';
import { useParams } from 'react-router-dom';
import Wepli from '../../sidebar/photo/weplilogo.png';

const StageItemBig = () => {
  const [stageInfo,setStageInfo] = useState({});

  const {userNick} = useParams();
  // 모달창 노출
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const [mo, setMo] = useState(false);
  const handleMo = () => setMo(true);
  const handleMc = () => setMo(false);
  const data =JSON.parse(sessionStorage.getItem("data"));
  const [checkStage, SetCheckStage] = useState(false);

//세션스토리지 최신화
  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await fetch("/lv0/m/mypage");
        const data = await response.json();

        //업데이트
        sessionStorage.setItem("data",JSON.stringify(data));

        if(data && data.stageaddress === null){
          SetCheckStage(true);
        }else{
          SetCheckStage(false);
        }
      }catch(error){
        console.log('업데이트 실패',error);
      }
    };
    fetchData();
  },[]);
//스테이지 정보를 불러오는 것이었던 것 
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        if(stageInfo !==null){
        const response = await Axios.get('/lv0/s/stagehistory',{
          params:{stageaddress:stageInfo},
        });
        setStageInfo(response.data);
        }
      }catch(error){
        console.log('가져오는데 실패함 ㅠ',error);
      }
    };
    fetchData();
  },[stageInfo])

  return (
    <>
      {checkStage ? (
        // address가 null일 때 버튼을 렌더링합니다.
        <div className="StageModalContainer">
          <button onClick={handleMo}
          className="button button--nina button--round-l button--text-thick button--inverted makestageButton"
          data-text="스테이지생성">
            <span>스</span>
            <span>테</span>
            <span>이</span>
            <span>지</span>
            <span>생</span>
            <span>성</span>
        </button>
      <Modal open={mo} onClose={handleMc}>
        <CSM types={true} />
      </Modal>
        </div>
      ) : (
        // address가 null이 아닐 때 스테이지 정보를 렌더링합니다.
        <div className="slpitembig">
          <div className="slpitembigheader">
            <div className="slpitembigimgwrapper" >
              {stageInfo && stageInfo.img !== null?(
                <img
                  className='slpitembigimg-icon'
                  alt='썸네일'
                  src={stageInfo.img}
                />
                ):(
                  <img
                  className='slpitembigimg-icon'
                  alt="스테이지썸네일"
                  src={Wepli}
                  />
                )}
                {stageInfo &&(
              <div className="slpitembigday">생성일 : {stageInfo.makeday}</div>
              )}
            </div>
            <div className="slpitembiginfo">
              <div className="slpitembiglikewrapper">
                <img
                  className="slpmystagepeopleicon"
                  alt=""
                  src={SLPMystagePeopleIcon}
                />
                <div className="slpmystagelikecount">{stageInfo.likes}</div>
              </div>
              <div className="slpitembiglikewrapper">
                <img
                  className="slpmystagepeopleicon"
                  alt=""
                  src={SLPMystageQIcon}
                />
                <div className="slpmystagelikecount">220</div>
              </div>
              <div className="slpmystageowner">@{stageInfo.nick}</div>
              <div className="slpmystagecategory">
                #{stageInfo.tag}
              </div>
              <div className="slpmystagecategory">
                #{stageInfo.genre}
              </div>
            </div>
          </div>
          <div className="slpitembigbody">
            <div className="slpmystagetitle">내 스테이지 입장</div>
            <div className="slpmystagedescription">
                {stageInfo.desc}
            </div>
            <div className="slpmystageplayingtitlewrapper">
              <img
                className="slpmystagepeopleicon"
                alt=""
                src={SLPMystagePlayingTitleIcon}
              />
              <div className="slpmystageplayingtitle">
                  {stageInfo.singer} - {stageInfo.title}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StageItemBig;
