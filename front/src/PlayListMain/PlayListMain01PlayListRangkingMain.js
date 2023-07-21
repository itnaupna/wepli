import React, {useEffect, useState} from 'react';
import "./PlayListMain01PlayListRangkingMain.css";
import HeartImg from  "../MainIMG/Heart.png";
import Molu from  "../MainIMG/Molu.gif";
import Aru from  "../MainIMG/ARu.gif";
import MusicList from "../MainIMG/MusicList.png";
import Follow from "../MainIMG/Follow.png";
import MypliIcon from "../MainIMG/MyPliIcon.png";
import RangkingIcon from "../MainIMG/RankingIcon.png";
import SearchIcon from "../MainIMG/SearchIcon.png";
import FollowToggleButton from "../MainIMG/FollowToggleButton.png";
import PlayListRankingTitle from "../MainIMG/PlayListRankinglogoTitle.png";
import Aris from "../MainIMG/Aris.gif";
import AddPliIcon from "../MainIMG/AddPliIcon.png";
import PlayListMenu from "./PlayListMenu";
import PlayLsitRankingLikeTop from "./PlayLsitRankingLikeTop";
import Axios from "axios";
import PlayListRankingFollowTop from "./PlayListRankingFollowTop";
import MyLikeAndFollowList from "./MyLikeAndFollowList";

function PlayListMain01PlayListRangkingMain(props) {
    const bucketURl = process.env.REACT_APP_BUCKET_URL;
    const reload = () =>{
        window.location.replace("");
    }

    return (
            <div className="playlistmain01">
                <div className="playlistrankingheader">
                    <img
                        className="playlistrankinglogotitle-icon"
                        alt=""
                        src={PlayListRankingTitle}
                        onClick={reload}
                    />
                        {<PlayListMenu/>}
                </div>
                <div className="playlistrankingbody">
                    <PlayLsitRankingLikeTop/>
                    <MyLikeAndFollowList/>
                    <PlayListRankingFollowTop/>
                </div>
            </div>
        )
}

export default PlayListMain01PlayListRangkingMain;