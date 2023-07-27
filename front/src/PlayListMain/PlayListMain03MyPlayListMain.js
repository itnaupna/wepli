import React from 'react';
import "./PlayListMain03MyPlayListMain.css";
import PlayListMenu from "./PlayListMenu";
import HeartImg from  "../MainIMG/Heart.png";
import Molu from  "../MainIMG/Molu.gif";
import Aru from  "../MainIMG/ARu.gif";
import MusicList from "../MainIMG/MusicList.png";
import PlayListMyPlilogoTitle from "../MainIMG/PlayListMyPlilogoTitle.png";
import Aris from "../MainIMG/Aris.gif";
import SearchBarIcon from "../MainIMG/SearchBarIcon.png";
import CommentIcon from "../MainIMG/CommentImg.png";
import SearchMusicListIcon from "../MainIMG/SearchMusicListIcon.png";
import SearchToggleIcon from "../MainIMG/SearchToggleIcon.png";
import MoluCover from "../MainIMG/MoluCover.png";
import PlaylistSlider from "./MyPliSlider";


const PlayListMain03MyPlayListMain = () => {

    return (
        <div className="playlistmain03">
            <div className="playlistmypliheader">
                <img
                    className="playlistmyplilogotitle-icon"
                    alt=""
                    src={PlayListMyPlilogoTitle}
                />
                <PlayListMenu />
            </div>
            <div className="playlistmyplibody">
                <PlaylistSlider/>
            </div>
        </div>
    );
};

export default PlayListMain03MyPlayListMain;