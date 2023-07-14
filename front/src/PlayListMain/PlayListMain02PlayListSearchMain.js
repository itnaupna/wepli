import React, {useEffect, useState} from 'react';
import "./PlayListMain02PlayListSearchMain.css";
import HeartImg from  "../MainIMG/Heart.png";
import Molu from  "../MainIMG/Molu.gif";
import Aru from  "../MainIMG/ARu.gif";
import MusicList from "../MainIMG/MusicList.png";
import Follow from "../MainIMG/Follow.png";
import MypliIcon from "../MainIMG/MyPliIcon.png";
import RangkingIcon from "../MainIMG/RankingIcon.png";
import SearchIcon from "../MainIMG/SearchIcon.png";
import AddPliIcon from "../MainIMG/AddPliIcon.png";
import PlayListSearchlogoTitle from "../MainIMG/PlayListSearchlogoTitle.png";
import Aris from "../MainIMG/Aris.gif";
import SearchBarIcon from "../MainIMG/SearchBarIcon.png";
import SearchCommentIcon from "../MainIMG/SearchCommentIcon.png";
import Axios from "axios";


function PlayListMain02PlayListSearchMain(props) {
    const [curr, setCurr] = useState(1);
    const [cpp, setCpp] = useState(50);
    const [orderByDay ,setOrderByDay] = useState(true);
    const [likeTop50, setLikeTop50] = useState([]);

    useEffect(()=>{
        const LikeTop50Url = "/api/lv0/p/list";
        Axios.get(LikeTop50Url,{ params: {orderByDay, curr, cpp}})
            .then(res =>
                setLikeTop50(res.data));
    });
    return (
        <div className="playlistmain02">
            <div className="playlistsearcjheader">
                <img
                    className="playlistsearchlogotitle-icon"
                    alt=""
                    src="/playlistsearchlogotitle@2x.png"
                />
                <div className="playlistbuttonlist-parent">
                    <div className="playlistbuttonlist">
                        <div className="playlistbuttonset1">
                            <div className="playlistbutton">
                                <img
                                    className="playlistbuttonicon"
                                    alt=""
                                    src="/playlistbuttonicon.svg"
                                />
                                <div className="playlistbuttontext">랭킹</div>
                            </div>
                            <div className="playlistbutton">
                                <img
                                    className="playlistbuttonicon"
                                    alt=""
                                    src="/playlistbuttonicon1.svg"
                                />
                                <div className="playlistbuttontext">검색</div>
                            </div>
                        </div>
                        <div className="playlistbuttonset1">
                            <div className="playlistbutton">
                                <img className="playlistbuttonicon" alt="" src="/sound.svg" />
                                <div className="playlistbuttontext">내 플리</div>
                            </div>
                            <div className="playlistbutton">
                                <img
                                    className="playlistbuttonicon"
                                    alt=""
                                    src="/playlistbuttonicon2.svg"
                                />
                                <div className="playlistbuttontext">플리 만들기</div>
                            </div>
                        </div>
                    </div>
                    <div className="searchtypebox-parent">
                        <div className="searchtypebox">
                            <div className="playlistmainsearchbody" />
                            <img
                                className="playlistmainsearchtoggle-icon"
                                alt=""
                                src="/playlistmainsearchtoggle.svg"
                            />
                            <div className="playlistmainsearchoption">제목</div>
                        </div>
                        <div className="playlistsearchbar">
                            <div className="playlsitsearchbarbody" />
                            <img
                                className="playlsitsearchicons"
                                alt=""
                                src="/playlsitsearchicons.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="playlistsearchbody">
                <div className="playlistitemwrapperframe">
                    {
                        likeTop50.map((item, idx)=>
                            <div className="playlistsearchitem">
                                <img
                                    className="playlistsearchthumbnail-icon"
                                    alt=""
                                    src="/playlistsearchthumbnail@2x.png"
                                />
                                <div className="playlistsearchinfowrapper">
                                    <div className="playlistsearchtagswrapper">
                                        <div className="playlistsearchcategory">
                                            #{item.genre}
                                        </div>
                                        <div className="playlistsearchtag">#{item.tag}</div>
                                    </div>
                                    <div className="playlistsearchcommentwrapper">
                                        <div className="playlistsearchcommentcount">1000</div>
                                        <img
                                            className="playlistsearchcommenticonwrapp"
                                            alt=""
                                            src={SearchCommentIcon}
                                        />
                                    </div>
                                    <div className="playlistsearchsongwrapper">
                                        <div className="playlistsearchcommentcount">1000</div>
                                        <img
                                            className="playlistsearchcommenticonwrapp"
                                            alt=""
                                            src={MusicList}
                                        />
                                    </div>
                                    <div className="playlistsearchmakeday">생성일 : {item.makeday}</div>
                                    <div className="playlistsearchowner">{item.nick}</div>
                                    <div className="playlistsearchtitle">{item.title}</div>
                                    <div className="playlistsearchlikewrapper">
                                        <img
                                            className="playlistsearchlikeicon"
                                            alt=""
                                            src={HeartImg}
                                        />
                                        <div className="playlistsearchlikecount">{item.likescount}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default PlayListMain02PlayListSearchMain;