import React from 'react';
import "./Test02.css";
import HeartImg from  "../MainIMG/Heart.png";
import Molu from  "../MainIMG/Molu.gif";
import Aru from  "../MainIMG/ARu.gif";
import MainBg from  "../MainIMG/BackIMG.svg";
import MusicList from "../MainIMG/MusicList.png";
import Follow from "../MainIMG/Follow.png";


function Test02(props) {
    return (
        <div className="platlistmain02">
            <div className="playlistmainall">
                <div className="playlistmainall">
                    <img className="bgimg-icon" alt="" src={MainBg} />
                </div>
                <div className="playlistitemwrapper">
                    <div className="playlistitemwrapperbg" />
                    <div className="playlistitemwrapperframe">
                        <div className="playlistitem">
                            <div className="playlistitembg" />
                            <img
                                className="playlistsearchbgimg-icon"
                                alt=""
                                src={Aru}
                            />
                            <div className="playlistitemin">
                                <div className="playlistiteminfos">
                                    <img
                                        className="playlistsearchtitlecover-icon"
                                        alt=""
                                        src={Aru}
                                    />
                                    <div className="playlistiteminfo">
                                        <div className="playlistmain02title">
                                            플레이 리스트 이름
                                        </div>
                                        <div className="playlistmain02playername">이상혁</div>
                                        <div className="playlistmain02createday">
                                            생성일 : 2024-07-05
                                        </div>
                                        <div className="playlistmain02taglayout">
                                            <div className="playlistmain02cate">#오늘은 김치찌개</div>
                                            <div className="playlistmain02cate">
                                                #오늘은김 치 찌 개 임
                                            </div>
                                        </div>
                                        <div className="playlistmain02like">
                                            <img
                                                className="platlistmain02hearticon"
                                                alt=""
                                                src={HeartImg}
                                            />
                                            <div className="platlistmain02likecount">1000</div>
                                        </div>
                                        <div className="playlistmessegecount">1000</div>
                                        <img
                                            className="playlistmessegeiconbody"
                                            alt=""
                                            src="/playlistmessegeiconbody.svg"
                                        />
                                        <div className="playlistmusiccount">1000</div>
                                        <img
                                            className="playlistmusiciconbody"
                                            alt=""
                                            src="/playlistmusiciconbody.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="playlistitem1">
                            <div className="playlistitembg" />
                            <img
                                className="playlistsearchbgimg-icon"
                                alt=""
                                src="/playlistsearchbgimg1@2x.png"
                            />
                            <div className="playlistitemin">
                                <div className="playlistiteminfos">
                                    <img
                                        className="playlistsearchtitlecover-icon1"
                                        alt=""
                                        src="/playlistsearchtitlecover1@2x.png"
                                    />
                                    <div className="playlistiteminfo">
                                        <div className="playlistmain02title">
                                            플레이 리스트 이름
                                        </div>
                                        <div className="playlistmain02playername">이상혁</div>
                                        <div className="playlistmain02createday">
                                            생성일 : 2024-07-05
                                        </div>
                                        <div className="playlistmain02taglayout">
                                            <div className="playlistmain02cate">#오늘은 김치찌개</div>
                                            <div className="playlistmain02cate">
                                                #오늘은김 치 찌 개 임
                                            </div>
                                        </div>
                                        <div className="playlistmain02like">
                                            <img
                                                className="platlistmain02hearticon"
                                                alt=""
                                                src="/platlistmain02hearticon1.svg"
                                            />
                                            <div className="platlistmain02likecount">1000</div>
                                        </div>
                                        <div className="playlistmessegecount">1000</div>
                                        <img
                                            className="playlistmessegeiconbody1"
                                            alt=""
                                            src="/playlistmessegeiconbody1.svg"
                                        />
                                        <div className="playlistmusiccount">1000</div>
                                        <img
                                            className="playlistmusiciconbody1"
                                            alt=""
                                            src="/playlistmusiciconbody1.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="playlistitem2">
                            <div className="playlistitembg" />
                            <img
                                className="playlistsearchbgimg-icon"
                                alt=""
                                src="/playlistsearchbgimg2@2x.png"
                            />
                            <div className="playlistitemin">
                                <div className="playlistiteminfos">
                                    <img
                                        className="playlistsearchtitlecover-icon1"
                                        alt=""
                                        src="/playlistsearchtitlecover2@2x.png"
                                    />
                                    <div className="playlistiteminfo">
                                        <div className="playlistmain02title">
                                            플레이 리스트 이름
                                        </div>
                                        <div className="playlistmain02playername">이상혁</div>
                                        <div className="playlistmain02createday">
                                            생성일 : 2024-07-05
                                        </div>
                                        <div className="playlistmain02taglayout">
                                            <div className="playlistmain02cate">#오늘은 김치찌개</div>
                                            <div className="playlistmain02cate">
                                                #오늘은김 치 찌 개 임
                                            </div>
                                        </div>
                                        <div className="playlistmain02like">
                                            <img
                                                className="platlistmain02hearticon"
                                                alt=""
                                                src="/platlistmain02hearticon2.svg"
                                            />
                                            <div className="platlistmain02likecount">1000</div>
                                        </div>
                                        <div className="playlistmessegecount">1000</div>
                                        <img
                                            className="playlistmessegeiconbody1"
                                            alt=""
                                            src="/playlistmessegeiconbody2.svg"
                                        />
                                        <div className="playlistmusiccount">1000</div>
                                        <img
                                            className="playlistmusiciconbody1"
                                            alt=""
                                            src="/playlistmusiciconbody2.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="playlistsearchbar">
                    <div className="playlsitsearchbarbody" />
                    <img
                        className="playlsitsearchicons"
                        alt=""
                        src="/playlsitsearchicons.svg"
                    />
                </div>
                <div className="playlistmainbuttonlist">
                    <div className="playlistmainbutton">
                        <div className="playlistmainbuttonbody" />
                        <div className="playlistmainbuttontitle">내 리스트</div>
                    </div>
                    <div className="playlistmainbutton1">
                        <div className="playlistmainbuttonbody" />
                        <div className="playlistmainbuttontitle1">랭킹</div>
                    </div>
                    <div className="playlistmainbutton2">
                        <div className="playlistmainbuttonbody" />
                        <div className="playlistmainbuttontitle2">전체 리스트</div>
                    </div>
                </div>
                <div className="searchtypebox">
                    <div className="playlistmainsearchbody" />
                    <img
                        className="playlistmainsearchtoggle-icon"
                        alt=""
                        src="/playlistmainsearchtoggle.svg"
                    />
                    <div className="playlistmainsearchoption">제목</div>
                </div>
            </div>
        </div>
    );
}

export default Test02;