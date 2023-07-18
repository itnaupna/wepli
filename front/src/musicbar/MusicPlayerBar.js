import React, { useState } from 'react';
import "./css/MusicPlayerBar.css";
import shuffle from "./svg/shuffle.svg";
import previous from "./svg/previous.svg";
import play from "./svg/playbtn.svg";
import next from "./svg/next.svg";
import repeat from "./svg/repeate.svg";
import volume from "./svg/volumedown.svg";
import axios from 'axios';
function MusicPlayerBar(props) {
const [songTitle, setSongTitle] = useState('노래제목');
const [songAuthor, setSongAuthor] = useState('가수');
const [songImg, setSongImg] = useState('');
    return (
        <div className="musicplayerframe">
        <div className="musicplayerbody">
          <div className="musicplayerbg">
            <img
              className="musicplayerbgimg-icon"
              alt=""
              src={songImg}
            />
            <div className="musicplayerbgeffect" />
          </div>
          <div className="musicplayersonginfo">
            <img className="albumcover-icon" alt="" src={songImg} />
            <div className="songsname-parent">
              <div className="songsname">{songTitle}</div>
              <div className="singer">{songAuthor}</div>
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
          </div>
          <div className="musicplayervolume">
            <img className="soundonicon" alt="" src={volume} />
            <div className="musicplayervoulmebar">
              <div className="endvoulmebar" />
              <div className="startvoulmebar" />
            </div>
          </div>
        </div>
        <div className="musicplayerheader" />
      </div>
    );
}

export default MusicPlayerBar;