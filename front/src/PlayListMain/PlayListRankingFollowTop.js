import React, {useEffect, useState} from 'react';
import Molu from "../MainIMG/Molu.gif";
import Follow from "../MainIMG/Follow.png";
import MusicList from "../MainIMG/MusicList.png";
import dayjs from 'dayjs';
import Axios from "axios";

function PlayListRankingFollowTop(props) {
    const [curr, setCurr] = useState(1);
    const [cpp, setCpp] = useState(50);
    const [orderByDay ,setOrderByDay] = useState(false);
    const [followTop, setFollowTop] = useState([]);

    useEffect(()=>{
        const FollowTop50Url = "/api/lv0/p/list";
        Axios.get(FollowTop50Url,{ params: {orderByDay, curr, cpp}})
            .then(res =>
                setFollowTop(res.data));
    },[]);
    return (
        <div className="playlistrankinglistwapper">
            <div className="playlistrankinglistwrapper2">
                <div className="playlistrankinglistitemswrappe">
                    <div className="playlistrankinglistitem">
                        <div className="playlistrankinglistitemnumber">50</div>
                        <img
                            className="playlistmain01followprofillimg-icon"
                            alt=""
                            src={Molu}
                        />
                        <div className="playlistrankinglistiteminfo12">
                            <div className="playlistrankinglistitemtitle">
                                닉네임자리에요
                            </div>
                        </div>
                        <div className="playlistrankinglistiteminfo22">
                            <div className="playlistrankinglistitemmakeday2">
                                가입일 : 2024-07-05
                            </div>
                            <div className="playlistmain01followitems">
                                <div className="playlistmain01follow">
                                    <div className="follow">
                                        <div className="follownum">1</div>
                                    </div>
                                    <img
                                        className="followrankinglsitfollowicons"
                                        alt=""
                                        src={Follow}
                                    />
                                </div>
                                <div className="playlistmain01followcount">
                                    <div className="playlistmain01playlistcount">
                                        <div className="follownum">1000</div>
                                    </div>
                                    <img
                                        className="followrankinglsitmusicicon"
                                        alt=""
                                        src={MusicList}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="playlistrankinglisttitle">팔로우 TOP</div>
        </div>
    );
}

export default PlayListRankingFollowTop;