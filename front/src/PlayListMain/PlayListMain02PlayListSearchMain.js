import React from 'react';
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


function PlayListMain02PlayListSearchMain(props) {
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
                    <div className="playlistsearchitem">
                        <img
                            className="playlistsearchthumbnail-icon"
                            alt=""
                            src="/playlistsearchthumbnail@2x.png"
                        />
                        <div className="playlistsearchinfowrapper">
                            <div className="playlistsearchtagswrapper">
                                <div className="playlistsearchcategory">
                                    #장르는최대열글자까지
                                </div>
                                <div className="playlistsearchtag">#태그도최대열글자까지</div>
                            </div>
                            <div className="playlistsearchcommentwrapper">
                                <div className="playlistsearchcommentcount">1000</div>
                                <img
                                    className="playlistsearchcommenticonwrapp"
                                    alt=""
                                    src="/playlistsearchcommenticonwrapper.svg"
                                />
                            </div>
                            <div className="playlistsearchsongwrapper">
                                <div className="playlistsearchcommentcount">1000</div>
                                <img
                                    className="playlistsearchcommenticonwrapp"
                                    alt=""
                                    src="/playlistsearchsongiconwrapper.svg"
                                />
                            </div>
                            <div className="playlistsearchmakeday">생성일 : 2024-07-05</div>
                            <div className="playlistsearchowner">이상혁</div>
                            <div className="playlistsearchtitle">플레이 리스트 이름</div>
                            <div className="playlistsearchlikewrapper">
                                <img
                                    className="playlistsearchlikeicon"
                                    alt=""
                                    src="/playlistsearchlikeicon.svg"
                                />
                                <div className="playlistsearchlikecount">1000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayListMain02PlayListSearchMain;