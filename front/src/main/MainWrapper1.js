import React from 'react';
import "./css/MainWrapper1.css";
import back from "./svg/back.svg";
import water1 from "./svg/water1.svg";
import water2 from "./svg/water2.svg";
import playbar from "./svg/playbar.svg";
function MainWrapper1(props) {
    return (
        <div className="mainwrapper1">
            <div className="mainwrapper1section">
                <div className="mainbackground3dimg">
                    <img className="main3dimg-icon" alt="" src={back} />
                </div>
                <div className="mainteamnamegroup">
                    <div className="teamnametext">JAM JUK JA</div>
                </div>
                <img
                    className="mainplaybargroup-icon"
                    alt=""
                    src={playbar}
                />
                <img
                    className="mainbackgroundwavegroup2-icon"
                    alt=""
                    src={water1}
                />
                <img
                    className="mainbackgroundwavegroup2-icon"
                    alt=""
                    src={water2}
                />
                <div className="playlistshadowgroup">
                    <div className="playlistinlinetextsection">
                        <b className="playlisttextsecond">playlist</b>
                    </div>
                    <div className="playlistoutlinetextsection">
                        <b className="playlisttextfirst">playlist</b>
                    </div>
                </div>
                <div className="stageshadowgroup">
                    <div className="stageinlinetextsection">
                        <b className="stagetextsecond">stage</b>
                    </div>
                    <div className="stageoutlinetextsection">
                        <b className="stagetextfirst">
                            <p className="MainWrapperstage">stage</p>
                        </b>
                    </div>
                </div>
                <div className="mainlogoslogangroup">
                    <div className="mainlogotextgroup">Wepli;</div>
                    <div className="mainslogantextgroup">we share, we make</div>
                </div>
            </div>
            <div className="mainwrapperloadingbar">
                <div className="mainwrapperloadinicon">
                    <div className="loading-minimal">
                        <div className="outline" />
                        <div className="loading-minimal-child" />
                        <b className="b">07:01</b>
                    </div>
                </div>
            </div>
            <div className="mainborderbordergroup">
                <div className="centerborderdesign" />
            </div>
        </div>
    );
}

export default MainWrapper1;