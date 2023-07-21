import React, {useEffect, useState} from 'react';
import Aru from "../MainIMG/ARu.gif";
import HeartImg from "../MainIMG/Heart.png";
import FollowToggleButton from "../MainIMG/FollowToggleButton.png";
import Axios from "axios";
import Molu from "../MainIMG/Molu.gif";
import Follow from "../MainIMG/Follow.png";
import MusicList from "../MainIMG/MusicList.png";

function MyLikeAndFollowList({myLikeList}) {
    const bucketURl = process.env.REACT_APP_BUCKET_URL;
    const [noLoginLike , setNoLoginLike] = useState("좋아요 한 플레이 리스트가 없습니다.");
    const [noLoginFollow , setNoLoginFollow] = useState("팔로우 한 유저가 없습니다.");
    const [isLikeHidden, setIsLikeHidden]  = useState(true);
    const [isFollowHidden , setIsFollowHidden] = useState(false);
    const [myFollowList , setMyFollowList] =useState([]);

    useEffect(()=>{
        if(sessionStorage.getItem("data")!=null) {
            setNoLoginLike("로그인 후 이용하실 수 있습니다");
            setNoLoginFollow("로그인 후 이용하실 수 있습니다");
        }
    },[]);

    const LikeToggle = (() =>{
        setIsLikeHidden(true);
        setIsFollowHidden(false);
        if(sessionStorage.getItem("data")==null) {
            setNoLoginLike("로그인 후 이용하실 수 있습니다");
            setNoLoginFollow("로그인 후 이용하실 수 있습니다");
        }else{
            setNoLoginLike("좋아요 한 플레이 리스트가 없습니다.");
            setNoLoginFollow("팔로우 한 유저가 없습니다.");
        }
    });

    const FollowToggle = (() =>{
        setIsLikeHidden(false);
        setIsFollowHidden(true);
        if(sessionStorage.getItem("data")!=null) {
            const myFollowListUrl = "/api/lv2/p/listfollow";
            Axios.get(myFollowListUrl)
                .then(res =>
                    setMyFollowList(res.data));
            setNoLoginLike("좋아요 한 플레이 리스트가 없습니다.");
            setNoLoginFollow("팔로우 한 유저가 없습니다.");
        }else{
            setNoLoginLike("로그인 후 이용하실 수 있습니다");
            setNoLoginFollow("로그인 후 이용하실 수 있습니다");
        }
    });

    return (
        <div className="playlistrankinglistwapper">
            <div className={isFollowHidden?"playlistrankinglistwrapper playlistrankingHidden":"playlistrankinglistwrapper"}>
                <div className="playlistrankinglistitemswrappe">
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
                    {
                        myLikeList.length === 0?<div className="MyLikePliNoLoging">{noLoginFollow}</div>:
                            myLikeList.map((item, idx) =>
                                <div className="playlistrankinglistitem">
                                    <div className="playlistrankinglistitemnumber">50</div>
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
                                            닉네임
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
                팔로우 한 유저 플레이리스트
            </div>
        </div>
    );
}

export default MyLikeAndFollowList;