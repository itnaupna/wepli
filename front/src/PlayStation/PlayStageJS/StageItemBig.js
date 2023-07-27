import React, { useEffect, useState } from 'react';
import SLPMystageLikeIcon from '../PlayStageImage/Icon/SLPMystageLikeIcon.svg';
import SLPMystagePeopleIcon from '../PlayStageImage/Icon/SLPMystagePeopleIcon.svg';
import SLPMystageQIcon from '../PlayStageImage/Icon/SLPMystageQIcon.svg';
import SLPMystagePlayingTitleIcon from '../PlayStageImage/Icon/SLPMystagePlayingTitleIcon.svg';
import CreateStageModal from "./CreateStageModal.js";

const StageItemBig = () => {
  // 모달창 노출
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const data =JSON.parse(sessionStorage.getItem("data"));
  const [checkStage, SetCheckStage] = useState(false);
  

  useEffect(() => {
    if (data&&data.stageaddress === null) {
      SetCheckStage(true);
    } else {
      SetCheckStage(false);
    }
  }, [data]);

  if(!data){
    return null;
  }

  return (
    <>
      {checkStage ? (
        // address가 null일 때 버튼을 렌더링합니다.
        <div className="StageModalContainer">
          <button
            onClick={showModal}
            className="button button--nina button--round-l button--text-thick button--inverted makestageButton"
            data-text="스테이지생성"
          >
            <span>스</span>
            <span>테</span>
            <span>이</span>
            <span>지</span>
            <span>생</span>
            <span>성</span>
          </button>
          {modalOpen && <CreateStageModal setModalOpen={setModalOpen} />}
        </div>
      ) : (
        // address가 null이 아닐 때 스테이지 정보를 렌더링합니다.
        <div className="slpitembig">
          <div className="slpitembigheader">
            <div className="slpitembigimgwrapper" >
              <img
                className="slpitembigimg-icon"
                alt="스테이지썸네일"
                src={null}
              />
              <div className="slpitembigday">생성일 : 2024-07-05</div>
            </div>
            <div className="slpitembiginfo">
              <div className="slpitembiglikewrapper">
                <img
                  className="slpmystagelikeicon"
                  alt=""
                  src={SLPMystageLikeIcon}
                />
                <div className="slpmystagelikecount">1000</div>
              </div>
              <div className="slpitembiglikewrapper">
                <img
                  className="slpmystagepeopleicon"
                  alt=""
                  src={SLPMystagePeopleIcon}
                />
                <div className="slpmystagelikecount">1000</div>
              </div>
              <div className="slpitembiglikewrapper">
                <img
                  className="slpmystagepeopleicon"
                  alt=""
                  src={SLPMystageQIcon}
                />
                <div className="slpmystagelikecount">1000</div>
              </div>
              <div className="slpmystageowner">@만든이이름드가는자리</div>
              <div className="slpmystagecategory">
                #일이삼사오육칠팔구십일
              </div>
              <div className="slpmystagecategory">
                #일이삼사오육칠팔구십일
              </div>
            </div>
          </div>
          <div className="slpitembigbody">
            <div className="slpmystagetitle">내 스테이지 생성</div>
            <div className="slpmystagedescription">
              나만의 스테이지를 가져보세요!
            </div>
            <div className="slpmystageplayingtitlewrapper">
              <img
                className="slpmystagepeopleicon"
                alt=""
                src={SLPMystagePlayingTitleIcon}
              />
              <div className="slpmystageplayingtitle">
                재생곡 제목 드갑니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StageItemBig;
