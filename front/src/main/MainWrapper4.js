import React from 'react';
import "./css/MainWrapper4.css";
import heart from "./photo/heart.png";
import albumcover from "./svg/albumcover.svg";
function MainWrapper4(props) {
    return (
        <div className="mainwrapper4">
            <div className="mainwrapper4group">
                <div className="mainwrapper4bottomtextgroup">
                    <div className="mainwrapperbottomtitletextsect">
                        <div className="mainwrapperbottomtitletext">WE MAKE PLAYLIST</div>
                    </div>
                    <div className="mainwrapperbottomsubtextsectio">
                        <div className="mainwrapperbottomsubtext">share</div>
                    </div>
                </div>
                <div className="mainwrapper4toptextgroup">
                    <div className="mainwrappertoptitletextsection">
                        <div className="mainwrappertoptitletext">PLAYLIST RANKING</div>
                    </div>
                    <div className="mainwrappertopsubtextsection">
                        <div className="mainwrappertopsubtext">TOP 3</div>
                    </div>
                </div>
                <div className="mainwrapper4rankingsection">
                    <div className="mainwrapper4secondrankgroup">
                        <div className="mainwrapper4secondrankimggroup">
                            <img
                                className="mainwrapper4secondrankimg-icon"
                                alt=""
                                src={albumcover}
                            />
                        </div>
                        <div className="mainwrapper4secondrankingtextg">
                            <img
                                className="mainwrapper4seondheart-icon"
                                alt=""
                                src={heart}
                            />
                            <div className="mainwrapper4secondrankingtext">1000</div>
                        </div>
                    </div>
                    <div className="mainwrapper4firstrankgroup">
                        <div className="mainwrapper4firstrankimggroup">
                            <img
                                className="mainwrapper4firstrankimg-icon"
                                alt=""
                                src={albumcover}
                            />
                        </div>
                        <div className="mainwrapper4firstrankingtextgr">
                            <img
                                className="mainwrapper4seondheart-icon"
                                alt=""
                                src={heart}
                            />
                            <div className="mainwrapper4firstrankingtext">1000</div>
                        </div>
                    </div>
                    <div className="mainwrapper4thirdrankgroup">
                        <div className="mainwrapper4thirdrankimggroup">
                            <img
                                className="mainwrapper4thirdrankimg-icon"
                                alt=""
                                src={albumcover}
                            />
                        </div>
                        <div className="mainwrapper4thirdrankingtextgr">
                            <img
                                className="mainwrapper4thirdheart-icon"
                                alt=""
                                src={heart}
                            />
                            <div className="mainwrapper4thirdrankingtext">1000</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainWrapper4;