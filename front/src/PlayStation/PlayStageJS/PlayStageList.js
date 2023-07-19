import React from "react";
import '../PlayStageCss/s-l-p.css';
import SLPFollowBackIcon from '../PlayStageImage/Icon/SLPFollowBackIcon.svg';
import SLPFollowNextIcon from '../PlayStageImage/Icon/SLPFollowNextIcon.svg';
import SLPMystageImg from '../PlayStageImage/img/SLPMystageImg.png';
import SLPFollowImg from '../PlayStageImage/img/SLPFollowImg.png';
import SLPResultItemImg from '../PlayStageImage/img/SLPResultItemImg.png';
import SLPMystageLikeIcon from '../PlayStageImage/Icon/SLPMystageLikeIcon.svg';
import SLPMystagePeopleIcon from '../PlayStageImage/Icon/SLPMystagePeopleIcon.svg';
import SLPMystageQIcon from '../PlayStageImage/Icon/SLPMystageQIcon.svg';
import SLPMystagePlayingTitleIcon from '../PlayStageImage/Icon/SLPMystagePlayingTitleIcon.svg';
import SLPMystagePlayingAuthorIcon from '../PlayStageImage/Icon/SLPMystagePlayingAuthorIcon.svg';
import StageItemBig from "./StageItemBig";
import ResultItem from "./ResultItem";
import CreateStageModal from "./CreateStageModal.js";
function PlayStageList(props) {
  // 모달창 노출 여부 statae
  const [modalOpen,setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () =>{
    setModalOpen(true);
  };
  return (
    <div className="slp">
      <div className="slptop">
        <div className="slpmystagewrapper">
          <StageItemBig />
          
            <div className="slpmystage">
            <div className="slpmystagetop">
              <div className="slpmystageimgwrapper">
                <div className="slpmystagemakeday">생성일 : 2024-07-05</div>
                <img
                  className="slpmystageimg-icon"
                  alt=""
                  src={SLPMystageImg}
                />
              </div>
              <div className="slpmystageinfo">
                <div className="slpmystagelikewrapper">
                  <img
                    className="slpmystagelikeicon"
                    alt=""
                    src={SLPMystageLikeIcon}
                  />
                  <div className="slpmystagelikecount">1000</div>
                </div>
                <div className="slpmystagelikewrapper">
                  <img
                    className="slpmystagepeopleicon"
                    alt=""
                    src={SLPMystagePeopleIcon}
                  />
                  <div className="slpmystagelikecount">1000</div>
                </div>
                <div className="slpmystagelikewrapper">
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
            <div className="slpmystagedetail">
              <div className="slpmystageplayinginfo">
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
                <div className="slpmystageplayingtitlewrapper">
                  <img
                    className="slpmystagepeopleicon"
                    alt=""
                    src={SLPMystagePlayingAuthorIcon}
                  />
                  <div className="slpmystageplayingtitle">
                    재생곡 제목 드갑니다.
                  </div>
                </div>
              </div>
              <div className="slpmystagedescription">
                나만의 스테이지를 가져보세요!
              </div>
              <div className="slpmystagetitle">내 스테이지 생성</div>
            </div>
            </div>
        </div>
        <div className="StageModalContainer">                
                <button onClick={showModal} className="button button--nina button--round-l button--text-thick button--inverted" data-text="스테이지생성">
                <span>스</span><span>테</span><span>이</span><span>지</span><span>생</span><span>성</span>
                </button>
                {modalOpen && <CreateStageModal setModalOpen={setModalOpen}/>}
        </div>
        <div className="slpfollowwrapper">
          <div className="slpfollowback">
            <img
              className="slpfollowbackicon"
              alt=""
              src={SLPFollowBackIcon}
            />
          </div>
          <StageItemBig />
          <div className="slpfollowback">
            <img
              className="slpfollowbackicon"
              alt=""
              src={SLPFollowNextIcon}
            />
          </div>
        </div>
      </div>
      <div className="slpbottom">
        <div className="slpsearchwrapper">
          <div className="slpsortwrapper">
            <div className="slpsort" >
              <select>
                <option>최신순</option>
                <option>인기순</option>
              </select>
            </div>
          </div>
          <div className="slpsearchwrapper1">
            <div className="slpsearchtype" />
            <div className="slpsearchinput" />
          </div>
        </div>
        <div className="slpresult">
          <ResultItem /><ResultItem /><ResultItem /><ResultItem /><ResultItem /><ResultItem />
        </div>
      </div>
    </div>
  )
}

export default PlayStageList;