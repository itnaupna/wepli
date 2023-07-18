import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import Slide from '../PlayStageJS/Slide.js';
import '../PlayStageCss/s-l-p.css';
import SLPMystageImg from '../PlayStageImage/img/SLPMystageImg.png';
import SLPFollowImg from '../PlayStageImage/img/SLPFollowImg.png';
import SLPResultItemImg from '../PlayStageImage/img/SLPResultItemImg.png';
import SLPMystageLikeIcon from '../PlayStageImage/Icon/SLPMystageLikeIcon.svg';
import SLPMystagePeopleIcon from '../PlayStageImage/Icon/SLPMystagePeopleIcon.svg';
import SLPMystageQIcon from '../PlayStageImage/Icon/SLPMystageQIcon.svg';
import SLPMystagePlayingTitleIcon from '../PlayStageImage/Icon/SLPMystagePlayingTitleIcon.svg';
import SLPMystagePlayingAuthorIcon from '../PlayStageImage/Icon/SLPMystagePlayingAuthorIcon.svg';
import SLPFollowBackIcon from '../PlayStageImage/Icon/SLPFollowBackIcon.svg';
import SLPFollowNextIcon from '../PlayStageImage/Icon/SLPFollowNextIcon.svg';
function PlayStageList(props) {

  return (
    <div className="slp">
      <div className="slptop">
        <div className="slpmystagewrapper">
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
        <div className="slpfollowwrapper">
          <div className="slpfollowback">
            <img
              className="slpfollowbackicon"
              alt=""
              src={SLPFollowBackIcon}
            />
          </div>
          <div className="slpfollow">
            <div className="slpmystagetop">
              <div className="slpmystageimgwrapper">
                <div className="slpmystagemakeday">생성일 : 2024-07-05</div>
                <img
                  className="slpmystageimg-icon"
                  alt=""
                  src={SLPFollowImg}
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
                  <div className="slpmystageplayingtitle">우워옹 캬오오옹</div>
                </div>
                <div className="slpmystageplayingtitlewrapper">
                  <img
                    className="slpmystagepeopleicon"
                    alt=""
                    src={SLPMystagePlayingAuthorIcon}
                  />
                  <div className="slpmystageplayingtitle">애옹이</div>
                </div>
              </div>
              <div className="slpmystagedescription">
                애옹애옹 애옹이가 울부짖었다
              </div>
              <div className="slpmystagetitle">팔로우 스테이지</div>
            </div>
          </div>
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
            <div className="slpsort" />
          </div>
          <div className="slpsearchwrapper1">
            <div className="slpsearchtype" />
            <div className="slpsearchinput" />
          </div>
        </div>
        <div className="slpresult">
          <div className="slpresultitem">
            <div className="slpmystagetop">
              <div className="slpresultitemimgwrapper">
                <img
                  className="slpresultitemimg-icon"
                  alt=""
                  src={SLPResultItemImg}
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
                <div className="slpresultitemplayingtitlewrapp">
                  <img
                    className="slpmystagepeopleicon"
                    alt=""
                    src={SLPMystagePlayingTitleIcon}
                  />
                  <div className="slpmystageplayingtitle">
                    재생곡 제목 드갑니다.
                  </div>
                </div>
                <div className="slpresultitemplayingtitlewrapp">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayStageList;