import React, {useEffect, useState} from 'react';
import "./PlayListMain01PlayListRangkingMain.css";
import PlayListRankingTitle from "../MainIMG/PlayListRankinglogoTitle.png";
import PlayListMenu from "./PlayListMenu";
import PlayLsitRankingLikeTop from "./PlayLsitRankingLikeTop";
import Axios from "axios";
import PlayListRankingFollowTop from "./PlayListRankingFollowTop";
import MyLikeList from "./MyLikeList";
import MyFollowList from "./MyFollowList";
import FollowToggleButton from "../MainIMG/FollowToggleButton.png";

function PlayListMain01PlayListRangkingMain(props) {
    const bucketURl = process.env.REACT_APP_BUCKET_URL;
    const reload = () =>{
        window.location.replace("");
    }
    const [rankingData, setRankingData] = useState([]);
    const [likeTop50, setLikeTop50] = useState([]);
    const [followTop50, setFollowTop50] = useState([]);
    const [myLikeList, setMyLikeList] = useState([]);
    const [noLoginLike , setNoLoginLike] = useState("좋아요 한 플레이 리스트가 없습니다.");
    const [noLoginFollow , setNoLoginFollow] = useState("팔로우 한 유저가 없습니다.");
    const [isLikeHidden, setIsLikeHidden]  = useState(true);
    const [isFollowHidden , setIsFollowHidden] = useState(false);
    const [myFollowList , setMyFollowList] =useState([]);

    useEffect(()=>{
        const RankingDataUrl = "/api/lv0/p/plimaindata";
        Axios.get(RankingDataUrl)
            .then(res =>
                setRankingData(res.data),
            );
        if(sessionStorage.getItem("data")!=null) {
            setNoLoginLike("로그인 후 이용하실 수 있습니다");
            setNoLoginFollow("로그인 후 이용하실 수 있습니다");
        }
    },[]);

    useEffect(()=>{
        setLikeTop50(rankingData.likeTopPli);
        setFollowTop50(rankingData.followTop);
        setMyLikeList(rankingData.likePli);
    }, [rankingData]);


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
                    <div className="playlistrankinglistwapper">
                        <div className="playlistrankinglistwrapper">
                            <div className="playlistrankinglistitemswrappe">
                                {
                                    likeTop50 !== undefined?
                                    likeTop50.map((likeTop50, idx)=>
                                    <PlayLsitRankingLikeTop item={likeTop50} key={idx} ranking={idx}/>
                                    ):<div className="MyLikePliNoLoging">Loading...</div>
                                }
                            </div>
                        </div>
                        <div className="playlistrankinglisttitle">좋아요 TOP</div>
                    </div>

                    <div className="playlistrankinglistwapper">
                        <div className={isFollowHidden?"playlistrankinglistwrapper playlistrankingHidden":"playlistrankinglistwrapper"}>
                            <div className="playlistrankinglistitemswrappe">
                                {
                                    sessionStorage.getItem("data") == null?<div className="MyLikePliNoLoging">로그인 후 이용하실 수 있습니다</div>:
                                    myLikeList !== undefined?
                                    myLikeList.length === 0?<div className="MyLikePliNoLoging">좋아요 한 플레이 리스트가 없습니다.</div>:
                                        myLikeList.map((myLikeList, idx) =>
                                            <MyLikeList item={myLikeList} key={idx} idx={idx}/>
                                        ):<div className="MyLikePliNoLoging">Loading...</div>
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
                    </div>

                    {/*<MyFollowList/>*/}

                    <div className="playlistrankinglistwapper">
                        <div className="playlistrankinglistwrapper2">
                            <div className="playlistrankinglistitemswrappe">
                                {
                                    followTop50 !== undefined?
                                    followTop50.map((followTop50, idx) =>
                                    <PlayListRankingFollowTop item={followTop50}  key={idx} ranking={idx}/>
                                    ):<div className="MyLikePliNoLoging">Loading...</div>
                                }
                            </div>
                        </div>
                        <div className="playlistrankinglisttitle">팔로우 TOP</div>
                    </div>
                </div>
            </div>
        )
}

export default PlayListMain01PlayListRangkingMain;