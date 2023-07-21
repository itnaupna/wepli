import React, {useEffect, useState} from 'react';
import Aru from "../MainIMG/ARu.gif";
import HeartImg from "../MainIMG/Heart.png";
import FollowToggleButton from "../MainIMG/FollowToggleButton.png";
import Axios from "axios";
import Molu from "../MainIMG/Molu.gif";
import Follow from "../MainIMG/Follow.png";
import MusicList from "../MainIMG/MusicList.png";

function MyLikeAndFollowList(props) {
    const [myLikeList, setMyLikeList] = useState([]);
    const [noLoginLike , setNoLoginLike] = useState("좋아요 한 플레이 리스트가 없습니다.");
    const [noLoginFollow , setNoLoginFollow] = useState("팔로우 한 유저가 없습니다.");
    const [isLikeHidden, setIsLikeHidden]  = useState(true);
    const [isFollowHidden , setIsFollowHidden] = useState(false);

    useEffect(()=>{
        if(sessionStorage.getItem("data")!=null) {
            const myLikeListUrl = "/api/lv2/p/listlike";
            Axios.get(myLikeListUrl)
                .then(res =>
                    setMyLikeList(res.data));
        }else{
            setNoLoginLike("로그인 후 이용하실 수 있습니다");
            setNoLoginFollow("로그인 후 이용하실 수 있습니다");
        }
    },[]);

    const LikeToggle = (() =>{
        setIsLikeHidden(true);
        setIsFollowHidden(false);
    });

    const FollowToggle = (() =>{
        setIsLikeHidden(false);
        setIsFollowHidden(true);
    });

    return (
        <div className="playlistrankinglistwapper">
            <div className={isFollowHidden?"playlistrankinglistwrapper playlistrankingHidden":"playlistrankinglistwrapper"}>
                <div className="playlistrankinglistitemswrappe">
                    <div>시발</div>
                    {
                        myLikeList.length === 0?<div className="MyLikePliNoLoging">{noLoginLike}</div>:
                        myLikeList.map((item, idx) =>
                            <div className="playlistrankinglistitem" key={idx}>
                                <div className="playlistrankinglistitemnumber">{idx+1}</div>
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
                        )
                    }
                </div>
                <div className={isFollowHidden?"playlistrankinglisttoggle playlistrankingHidden":"playlistrankinglisttoggle"} onClick={FollowToggle}>
                    <div className="rankinglistitemtogglecaption">팔로우</div>
                    <img
                        className="rankinglistitemtogglebox-icon"
                        alt=""
                        src={FollowToggleButton}
                    />
                </div>
            </div>
            <div className={isFollowHidden?"playlistrankinglisttitle playlistrankingHidden":"playlistrankinglisttitle"}>
                좋아요 표시한 플레이리스트
            </div>

            <div className={isLikeHidden? "playlistrankinglistwrapper playlistrankingHidden":"playlistrankinglistwrapper"}>
                <div className="playlistrankinglistitemswrappe">
                    <div>지랄</div>
                    {
                        myLikeList.length === 0?<div className="MyLikePliNoLoging">{noLoginFollow}</div>:
                            myLikeList.map((item, idx) =>
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
                            )
                    }
                </div>
                <div className="playlistrankinglisttoggle" onClick={LikeToggle}>
                    <div className="rankinglistitemtogglecaption">좋아요</div>
                    <img
                        className="rankinglistitemtogglebox-icon"
                        alt=""
                        src={FollowToggleButton}
                    />
                </div>
            </div>
            <div className={isLikeHidden? "playlistrankinglisttitle playlistrankingHidden":"playlistrankinglisttitle"}>
                팔로우 한 유저
            </div>
        </div>
    );
}

export default MyLikeAndFollowList;