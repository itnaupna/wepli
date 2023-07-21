import React, {useEffect, useState} from 'react';
import Aru from "../MainIMG/ARu.gif";
import HeartImg from "../MainIMG/Heart.png";
import FollowToggleButton from "../MainIMG/FollowToggleButton.png";
import Axios from "axios";
import Molu from "../MainIMG/Molu.gif";
import Follow from "../MainIMG/Follow.png";
import MusicList from "../MainIMG/MusicList.png";

function MyLikeList({item, idx}) {
    const bucketURl = process.env.REACT_APP_BUCKET_URL;

    return (

        <div className="playlistrankinglistitem">
            <div className="playlistrankinglistitemnumber">{idx + 1}</div>
            <img
                className="playlistrankinglistitemthumbna-icon"
                alt=""
                src={Aru}
            />
            <div className="playlistrankinglistiteminfo1">
                <div className="playlistrankinglistitemtitle">
                    열글자까지가능합니다
                </div>
                <div className="playlistrankinglistitemowner">
                    {item.nick}
                </div>
            </div>
            <div className="playlistrankinglistiteminfo2">
                <div className="playlistrankinglistitemmakeday">
                    생성일 : 2024-07-05
                </div>
                <div className="playlistrankinglistitemlikegro">
                    <div className="playlistrankinglistitemlikenum">1000</div>
                    <img
                        className="playlistrankinglistitemlikeico-icon"
                        alt=""
                        src={HeartImg}
                    />
                </div>
                <div className="playlistrankinglistitemtags">
                    <div className="playlistrankinglistitemcategor">
                        #발라드
                    </div>
                    <div className="playlistrankinglistitemcategor">
                        #치킨을 먹고싶다
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyLikeList;