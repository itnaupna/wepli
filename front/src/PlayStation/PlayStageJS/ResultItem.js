import React, { useEffect } from 'react';
import SLPMystagePeopleIcon from '../PlayStageImage/Icon/SLPMystagePeopleIcon.svg';
import SLPMystagePlayingTitleIcon from '../PlayStageImage/Icon/SLPMystagePlayingTitleIcon.svg';
// import TestImg from '../PlayStageImage/img/SLPMystageImg.png';

const ResultItem = ({data}) => {
  // useEffect(()=>{
  //   // console.log(data);
  // },[data])
    return (
        <div className="slpresultitem">
            <div className="slpitembigheader">
              <div className="slpresultitemimgwrapper">
                <img
                  className="slpresultitemimg-icon"
                  alt=""
                  src={data.img}
                />
              </div>
              <div className="slpresultiteminfo">
                <div className="slpresultitempeoplewrapper">
                  <img
                    className="slpmystagepeopleicon"
                    alt=""
                    src={SLPMystagePeopleIcon}
                  />
                  {/* <div className="slpmystagelikecount">{Object.keys(data.info.users).length}</div> */}
                </div>
                <div className="slpresultitemowner">@{data.nick}</div>
                <div className="slpresultitemcategory">
                  {data.genre?.split(',')[0]===undefined ? null : '#'+data.genre?.split(',')[0]}
                </div>
                <div className="slpresultitemcategory">
                {data.tag?.split(',')[0]===undefined ? null : '#'+data.tag?.split(',')[0]}
                </div>
              </div>
            </div>
            <div className="slpresultitembottom">
              <div className="slpresultitemtitle">
                {/* {data.pw ? "🔒" : null} */}
                 {data.title}
                </div>
              <div className="slpresultitemdescription">
                {data.desc}
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