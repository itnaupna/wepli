import React from 'react';
import "./css/MusicPlayerBar.css";
import shuffle from "./svg/shuffle.svg";
import previous from "./svg/previous.svg";
import play from "./svg/playbtn.svg";
import next from "./svg/next.svg";
import repeat from "./svg/repeate.svg";
import volume from "./svg/volumedown.svg";
import cover from "./photo/MusicPlayerCover.png";
import album from "./svg/cover.svg";
function MusicPlayerBar(props) {
    return (
        <div className="musicplayerframe">
            <div className="musicplayerbody">
                <div className="musicplayerbg">
                    <img
                        className="musicplayerbgimg-icon"
                        alt=""
                        src={cover}
                    />
                    <div className="musicplayerbgeffect" />
                </div>
                <div className="musicplayersonginfo">
                    <img className="albumcover-icon" alt="" src={album} />
                    <div className="songsname">한국을 빛낸 100명의 위인들</div>
                    <div className="singer">아이유</div>
                </div>
                <div className="musicplayerplaybar">
                    <img
                        className="musicplayershuffleiconbody"
                        alt=""
                        src={shuffle}
                    />
                    <img
                        className="musicplayerpreviousiconbody"
                        alt=""
                        src={previous}
                    />
                    <div className="musicplayerplaybuttonbody">
                        <img
                            className="musicplayerplaybutton-icon"
                            alt=""
                            src={play}
                        />
                    </div>
                    <img
                        className="musicplayerpreviousiconbody"
                        alt=""
                        src={next}
                    />
                    <img
                        className="musicplayershuffleiconbody"
                        alt=""
                        src={repeat}
                    />
                </div>
                <img
                    className="musicplayervolume-icon"
                    alt=""
                    src={volume}
                />
            </div>
            <div className="musicplayerheader" />
        </div>
    );
}

export default MusicPlayerBar;