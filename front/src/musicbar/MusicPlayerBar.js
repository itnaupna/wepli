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
        <div className="musicplayerframes">
            <div className="headloading">
                <div className="musicplayerframe">
                    <div className="musicplayerheadloadingframe">
                        <img
                            className="musicplayercover-icon"
                            alt=""
                            src={cover}
                        />
                        <div className="musicplayerbarbody" />
                        <div className="musicplayervolume">
                            <div className="musicplayervoulmebar">
                                <div className="endvoulmebar" />
                                <div className="startvoulmebar" />
                            </div>
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
                            <img className="soundonicon" alt="" src={volume} />
                        </div>
                        <div className="musicplayerinfo">
                            <div className="songsname">한국을 빛낸 100명의 위인들</div>
                            <div className="singer">아이유</div>
                            <img
                                className="albumcover-icon"
                                alt=""
                                src={album}
                            />
                        </div>
                    </div>
                </div>
                <div className="musicplayerlodingbar">
                    <div className="musicplayerstartbar" />
                </div>
            </div>
        </div>
    );
}

export default MusicPlayerBar;