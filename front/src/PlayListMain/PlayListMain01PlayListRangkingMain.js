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
import { useNavigate } from 'react-router-dom';

function PlayListMain01PlayListRangkingMain(props) {
    const navigate = useNavigate();
    const [rankingData, setRankingData] = useState([]);
    const [likeTop50, setLikeTop50] = useState([]);
    const [followTop50, setFollowTop50] = useState([]);
    const [myLikeList, setMyLikeList] = useState([]);
    const [myFollowList, setMyFollowList] = useState([]);
    const [isLikeHidden, setIsLikeHidden] = useState(true);
    const [isFollowHidden, setIsFollowHidden] = useState(false);
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        let nickname = window.localStorage.getItem("data");
        if(nickname == null) {
            nickname = window.sessionStorage.getItem("data");
        } 
        
        if(nickname && nickname.includes("nick")) {
            nickname = JSON.parse(nickname).nick;
        }
        setNickname(nickname);
        const RankingDataUrl = "/api/lv0/p/plimaindata";
        Axios.get(RankingDataUrl)
            .then(res =>
                setRankingData(res.data),
            );
    }, []);

    useEffect(() => {
        setLikeTop50(rankingData.likeTopPli);
        setFollowTop50(rankingData.followTop);
        setMyLikeList(rankingData.likePli);
    }, [rankingData]);


    const LikeToggle = (() => {
        setIsLikeHidden(true);
        setIsFollowHidden(false);
    });

    const FollowToggle = (() => {
        setIsLikeHidden(false);
        setIsFollowHidden(true);
        if (sessionStorage.getItem("data") != null) {
            const myFollowListUrl = "/api/lv2/p/listfollow";
            Axios.get(myFollowListUrl)
                .then(res =>
                    setMyFollowList(res.data));
        }
    });

    const clickMypageHandler = (target) => {
        if(nickname === target) {
            navigate("/mypage");
        } else {
            navigate(`/mypage/${target}`);
        }
    }

    const pliDetailHandler = (target) => {
        navigate(`/pli/${target}`);
    }

    return (
        <div className="playlistmain01">
            <div className="playlistrankingheader">
                <img
                    className="playlistrankinglogotitle-icon"
                    alt=""
                    src={PlayListRankingTitle}
                />
                {<PlayListMenu/>}
            </div>
            <div className="playlistrankingbody">
                <div className="playlistrankinglistwapper">
                    <div className="playlistrankinglistwrapper">
                        <div className="playlistrankinglistitemswrappe">
                            {
                                likeTop50 !== undefined ?
                                    likeTop50.map((likeTop50, idx) =>
                                        <PlayLsitRankingLikeTop item={likeTop50} key={idx} ranking={idx} pliDetail={pliDetailHandler}/>
                                    ) : <div className="MyLikePliNoLoging">Loading...</div>
                            }
                        </div>
                    </div>
                    <div className="playlistrankinglisttitle">좋아요 TOP</div>
                </div>

                <div className={isFollowHidden ? "playlistrankinglistwapper playlistrankingHidden" : "playlistrankinglistwapper"}>
                    <div
                        className="playlistrankinglistwrapper">
                        <div className="playlistrankinglistitemswrappe">
                            {
                                sessionStorage.getItem("data") == null ?
                                    <div className="MyLikePliNoLoging">로그인 후 이용하실 수 있습니다</div> :
                                    myLikeList === undefined ? <div className="MyLikePliNoLoging">Loading...</div> :
                                        myLikeList.length === 0 ?
                                            <div className="MyLikePliNoLoging">좋아요 한 플레이리스트가 없습니다.</div> :
                                            myLikeList.map((myLikeList, idx) =>
                                                <MyLikeList item={myLikeList} key={idx} idx={idx} pliDetail={pliDetailHandler}/>
                                            )
                            }
                        </div>
                        <div
                            className="playlistrankinglisttoggle"
                            onClick={FollowToggle}>
                            <div className="rankinglistitemtogglecaption">팔로우</div>
                            <img
                                className="rankinglistitemtogglebox-icon"
                                alt=""
                                src={FollowToggleButton}
                            />
                        </div>
                    </div>
                    <div
                        className={isFollowHidden ? "playlistrankinglisttitle playlistrankingHidden" : "playlistrankinglisttitle"}>
                        좋아요 표시한 플레이리스트
                    </div>
                </div>
                <div className={ isLikeHidden ? "playlistrankinglistwapper playlistrankingHidden" : "playlistrankinglistwapper"}>
                    <div
                        className="playlistrankinglistwrapper">
                        <div className="playlistrankinglistitemswrappe">
                            {
                                sessionStorage.getItem("data") == null ?
                                    <div className="MyLikePliNoLoging">로그인 후 이용하실 수 있습니다</div> :
                                    myFollowList === undefined ? <div className="MyLikePliNoLoging">Loading...</div> :
                                    myFollowList.length === 0 ?
                                        <div className="MyLikePliNoLoging">팔로우 한 유저가 없습니다</div> :
                                        myFollowList.map((myFollowList, idx) =>
                                            <MyFollowList item={myFollowList} key={idx} idx={idx} pliDetail={pliDetailHandler}/>
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
                    <div
                        className="playlistrankinglisttitle">
                        팔로우 한 유저 플레이리스트
                    </div>
                </div>

                <div className="playlistrankinglistwapper">
                    <div className="playlistrankinglistwrapper2">
                        <div className="playlistrankinglistitemswrappe">
                            {
                                followTop50 !== undefined ?
                                    followTop50.map((followTop50, idx) =>
                                        <PlayListRankingFollowTop item={followTop50} key={idx} ranking={idx} mypage={clickMypageHandler}/>
                                    ) : <div className="MyLikePliNoLoging">Loading...</div>
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