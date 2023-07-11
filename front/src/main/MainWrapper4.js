import React from 'react';
import "./css/MainWrapper4.css";
import heart from "./photo/heart.png";
import albumcover from "./svg/albumcover.svg";
function MainWrapper4(props) {
    return (
        <div className="mainwrapper4-1">
            <div className="group-parent">
                <div className="we-make-playlist-wrapper">
                    <div className="we-make-playlist">WE MAKE PLAYLIST</div>
                </div>
                <div className="share-wrapper">
                    <div className="share">share</div>
                </div>
            </div>
            <div className="group-container">
                <div className="playlist-ranking-wrapper">
                    <div className="we-make-playlist">PLAYLIST RANKING</div>
                </div>
                <div className="top-3-wrapper">
                    <div className="share">TOP 3</div>
                </div>
            </div>
            <div className="firstrankimg">
                <img className="album2-3-icon" alt="" src={albumcover} />
            </div>
            <div className="secondrankimg">
                <img className="album2-3-icon" alt="" src={albumcover}/>
            </div>
            <div className="thirdrankingimg">
                <img className="album2-3-icon" alt="" src={albumcover}/>
            </div>
            <div className="secondrankingtext">
                <img className="icons" alt="" src={heart} />
                <div className="seondrankcount">1000</div>
            </div>
            <div className="firstrankingtext">
                <img className="icons" alt="" src={heart} />
                <div className="firstrankcount">1000</div>
            </div>
            <div className="thirdrankingtext">
                <img className="icons" alt="" src={heart} />
                <div className="firstrankcount">1000</div>
            </div>
        </div>
    );
}

export default MainWrapper4;