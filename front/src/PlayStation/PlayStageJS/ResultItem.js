import React from 'react';
import SLPMystagePeopleIcon from '../PlayStageImage/Icon/SLPMystagePeopleIcon.svg';
import SLPMystagePlayingTitleIcon from '../PlayStageImage/Icon/SLPMystagePlayingTitleIcon.svg';
import TestImg from '../PlayStageImage/img/SLPMystageImg.png';

const ResultItem = () => {
    return (
        <div className="slpresultitem">
            <div className="slpitembigheader">
              <div className="slpresultitemimgwrapper">
                <img
                  className="slpresultitemimg-icon"
                  alt=""
                  src={TestImg}
                />
              </div>
              <div className="slpresultiteminfo">
                <div className="slpresultitempeoplewrapper">
                  <img
                    className="slpmystagepeopleicon"
                    alt=""
                    src={SLPMystagePeopleIcon}
                  />
                  <div className="slpmystagelikecount">1000</div>
                </div>
                <div className="slpresultitemowner">@만든이이름드가는자리</div>
                <div className="slpresultitemcategory">
                  #일이삼사오육칠팔구십일
                </div>
                <div className="slpresultitemcategory">
                  #일이삼사오육칠팔구십일
                </div>
              </div>
            </div>
            <div className="slpresultitembottom">
              <div className="slpresultitemtitle">내 스테이지 생성</div>
              <div className="slpresultitemdescription">
                나만의 스테이지를 가져보세요!
              </div>
              <div className="slpresultitemplayinginfo">
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

export default ResultItem;