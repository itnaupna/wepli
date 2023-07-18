import React from 'react';
import SLPMystageLikeIcon from '../PlayStageImage/Icon/SLPMystageLikeIcon.svg';
import SLPMystagePeopleIcon from '../PlayStageImage/Icon/SLPMystagePeopleIcon.svg';
import SLPMystageQIcon from '../PlayStageImage/Icon/SLPMystageQIcon.svg';
import SLPMystagePlayingTitleIcon from '../PlayStageImage/Icon/SLPMystagePlayingTitleIcon.svg';
import TestImg from '../PlayStageImage/img/SLPMystageImg.png';

const StageItemBig = () => {
    return (
        <div className="slpitembig">
            <div className="slpitembigheader">
              <div className="slpitembigimgwrapper">
                <img
                  className="slpitembigimg-icon"
                  alt="스테이지썸네일"
                  src={TestImg}
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
    );
};

export default StageItemBig;