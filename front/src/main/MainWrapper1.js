import React from 'react';
import "./css/MainWrapper1.css";
import back from "./svg/back.svg";
import water1 from "./svg/water1.svg";
import water2 from "./svg/water2.svg";
import playbar from "./svg/playbar.svg";
function MainWrapper1(props) {
    return (
        <div className="mainwrapper">
            <div className="maincentersection">
                <div className="maincenterbackimg">
                    <img className="icon" alt="" src={back} />
                </div>
                <div className="mainbottomtext">
                    <div className="jam-juk-ja">JAM JUK JA</div>
                </div>
                <img className="centerwaterimg-icon" alt="" src={water1} />
                <img className="playbar-icon" alt="" src={playbar} />
                <img className="centerwaterimg-icon" alt="" src={water2} />
                <div className="centershadowtext">
                    <div className="plioutlinetext">
                        <b className="playlist">playlist</b>
                    </div>
                    <div className="plieinlinetext">
                        <b className="playlist1">playlist</b>
                    </div>
                </div>
                <div className="bottomshadowtext">
                    <div className="stageinlinetext">
                        <b className="stage">stage</b>
                    </div>
                    <div className="stageoutlinetext">
                        <b className="stage1">
                            <p className="stage2">stage</p>
                        </b>
                    </div>
                </div>
                <div className="bottomshadowtext">
                    <div className="stageinlinetext">
                        <b className="stage">stage</b>
                    </div>
                    <div className="stageoutlinetext">
                        <b className="stage1">
                            <p className="stage2">stage</p>
                        </b>
                    </div>
                </div>
                <div className="maintoptext">
                    <div className="wepli">Wepli;</div>
                    <div className="we-share-we">we share, we make</div>
                </div>
            </div>
            <div className="loadingbar">
                <div className="loading">
                    <div className="loading-minimal">
                        <div className="outline" />
                        <div className="loading-minimal-child" />
                        <b className="b">07:01</b>
                    </div>
                </div>
            </div>
            <div className="maincenterround">
                <div className="maincenterround-child" />
            </div>
        </div>
    );
}

export default MainWrapper1;