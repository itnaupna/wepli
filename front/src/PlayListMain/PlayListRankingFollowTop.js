import React, {useEffect, useState} from 'react';
import Molu from "../MainIMG/Molu.gif";
import Follow from "../MainIMG/Follow.png";
import MusicList from "../MainIMG/MusicList.png";
import dayjs from 'dayjs';
import Axios from "axios";

function PlayListRankingFollowTop(props) {
    const [followTop, setFollowTop] = useState([]);

    useEffect(()=>{
        const FollowTop50Url = "/api/lv0/f/followtop";
        Axios.get(FollowTop50Url)
            .then(res =>
                setFollowTop(res.data));
    },[]);

    return (
        <div className="playlistrankinglistwapper">
            <div className="playlistrankinglistwrapper2">
                <div className="playlistrankinglistitemswrappe">
                    {followTop.map((item, idx) =>
                        <div className="playlistrankinglistitem" key={idx}>
                            <div className="playlistrankinglistitemnumber">{idx+1}</div>
                            <img
                                className="playlistmain01followprofillimg-icon"
                                alt=""
                                src={Molu}
                            />
                            <div className="playlistrankinglistiteminfo12">
                                <div className="playlistrankinglistitemtitle">
                                    {item.t}
                                </div>
                            </div>
                            <div className="playlistrankinglistiteminfo22">
                                <div className="playlistmain01followitems">
                                    <div className="playlistmain01follow">
                                        <div className="follow">
                                            <div className="follownum">{item.cnt}</div>
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
                    )}
                </div>
            </div>
            <div className="playlistrankinglisttitle">팔로우 TOP</div>
        </div>
    );
}

export default PlayListRankingFollowTop;