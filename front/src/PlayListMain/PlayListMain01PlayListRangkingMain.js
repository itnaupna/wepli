import React from 'react';
import "./PlayListMain01PlayListRangkingMain.css";
import HeartImg from  "../MainIMG/Heart.png";
import Molu from  "../MainIMG/Molu.gif";
import Aru from  "../MainIMG/ARu.gif";
import MusicList from "../MainIMG/MusicList.png";
import Follow from "../MainIMG/Follow.png";
import MypliIcon from "../MainIMG/MyPliIcon.png";
import RangkingIcon from "../MainIMG/RankingIcon.png";
import SearchIcon from "../MainIMG/SearchIcon.png";
import FollowToggleButton from "../MainIMG/FollowToggleButton.png";
import PlayListRankingTitle from "../MainIMG/PlayListRankinglogoTitle.png";
import Aris from "../MainIMG/Aris.gif";
import AddPliIcon from "../MainIMG/AddPliIcon.png";

function PlayListMain01PlayListRangkingMain(props) {
        return (
            <div className="playlistmain01">
                <div className="playlistrankingheader">
                    <img
                        className="playlistrankinglogotitle-icon"
                        alt=""
                        src={PlayListRankingTitle}
                    />
                    <div className="playlistbuttonlist">
                        <div className="playlistbuttonset1">
                            <div className="playlistbutton">
                                <img
                                    className="playlistbuttonicon"
                                    alt=""
                                    src={RangkingIcon}
                                />
                                <div className="playlistbuttontext">랭킹</div>
                            </div>
                            <div className="playlistbutton">
                                <img
                                    className="playlistbuttonicon"
                                    alt=""
                                    src={SearchIcon}
                                />
                                <div className="playlistbuttontext">검색</div>
                            </div>
                        </div>
                        <div className="playlistbuttonset1">
                            <div className="playlistbutton">
                                <img className="playlistbuttonicon" alt="" src={MypliIcon} />
                                <div className="playlistbuttontext">내 플리</div>
                            </div>
                            <div className="playlistbutton">
                                <img
                                    className="playlistbuttonicon"
                                    alt=""
                                    src={AddPliIcon}
                                />
                                <div className="playlistbuttontext">플리 만들기</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="playlistrankingbody">
                    <div className="playlistrankinglistwapper">
                        <div className="playlistrankinglistwrapper">
                            <div className="playlistrankinglistitemswrappe">
                                <div className="playlistrankinglistitem">
                                    <div className="playlistrankinglistitemnumber">50</div>
                                    <img
                                        className="playlistrankinglistitemthumbna-icon"
                                        alt=""
                                        src={Aris}
                                    />
                                    <div className="playlistrankinglistiteminfo1">
                                        <div className="playlistrankinglistitemtitle">
                                            열글자까지가능합니다
                                        </div>
                                        <div className="playlistrankinglistitemowner">
                                            닉네임몇글자제한이지?
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
                                <div className="playlistrankinglistitem">
                                    <div className="playlistrankinglistitemnumber">50</div>
                                    <img
                                        className="playlistrankinglistitemthumbna-icon"
                                        alt=""
                                        src={Aris}
                                    />
                                    <div className="playlistrankinglistiteminfo1">
                                        <div className="playlistrankinglistitemtitle">
                                            열글자까지가능합니다
                                        </div>
                                        <div className="playlistrankinglistitemowner">
                                            닉네임몇글자제한이지?
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
                                </div><div className="playlistrankinglistitem">
                                <div className="playlistrankinglistitemnumber">50</div>
                                <img
                                    className="playlistrankinglistitemthumbna-icon"
                                    alt=""
                                    src={Aris}
                                />
                                <div className="playlistrankinglistiteminfo1">
                                    <div className="playlistrankinglistitemtitle">
                                        열글자까지가능합니다
                                    </div>
                                    <div className="playlistrankinglistitemowner">
                                        닉네임몇글자제한이지?
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
                            </div><div className="playlistrankinglistitem">
                                <div className="playlistrankinglistitemnumber">50</div>
                                <img
                                    className="playlistrankinglistitemthumbna-icon"
                                    alt=""
                                    src={Aris}
                                />
                                <div className="playlistrankinglistiteminfo1">
                                    <div className="playlistrankinglistitemtitle">
                                        열글자까지가능합니다
                                    </div>
                                    <div className="playlistrankinglistitemowner">
                                        닉네임몇글자제한이지?
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
                            </div><div className="playlistrankinglistitem">
                                <div className="playlistrankinglistitemnumber">50</div>
                                <img
                                    className="playlistrankinglistitemthumbna-icon"
                                    alt=""
                                    src={Aris}
                                />
                                <div className="playlistrankinglistiteminfo1">
                                    <div className="playlistrankinglistitemtitle">
                                        열글자까지가능합니다
                                    </div>
                                    <div className="playlistrankinglistitemowner">
                                        닉네임몇글자제한이지?
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
                                <div className="playlistrankinglistitem">
                                    <div className="playlistrankinglistitemnumber">50</div>
                                    <img
                                        className="playlistrankinglistitemthumbna-icon"
                                        alt=""
                                        src={Aris}
                                    />
                                    <div className="playlistrankinglistiteminfo1">
                                        <div className="playlistrankinglistitemtitle">
                                            열글자까지가능합니다
                                        </div>
                                        <div className="playlistrankinglistitemowner">
                                            닉네임몇글자제한이지?
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
                                <div className="playlistrankinglistitem">
                                    <div className="playlistrankinglistitemnumber">50</div>
                                    <img
                                        className="playlistrankinglistitemthumbna-icon"
                                        alt=""
                                        src={Aris}
                                    />
                                    <div className="playlistrankinglistiteminfo1">
                                        <div className="playlistrankinglistitemtitle">
                                            열글자까지가능합니다
                                        </div>
                                        <div className="playlistrankinglistitemowner">
                                            닉네임몇글자제한이지?
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
                                <div className="playlistrankinglistitem">
                                    <div className="playlistrankinglistitemnumber">50</div>
                                    <img
                                        className="playlistrankinglistitemthumbna-icon"
                                        alt=""
                                        src={Aris}
                                    />
                                    <div className="playlistrankinglistiteminfo1">
                                        <div className="playlistrankinglistitemtitle">
                                            열글자까지가능합니다
                                        </div>
                                        <div className="playlistrankinglistitemowner">
                                            닉네임몇글자제한이지?
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
                                <div className="playlistrankinglistitem">
                                    <div className="playlistrankinglistitemnumber">50</div>
                                    <img
                                        className="playlistrankinglistitemthumbna-icon"
                                        alt=""
                                        src={Aris}
                                    />
                                    <div className="playlistrankinglistiteminfo1">
                                        <div className="playlistrankinglistitemtitle">
                                            열글자까지가능합니다
                                        </div>
                                        <div className="playlistrankinglistitemowner">
                                            닉네임몇글자제한이지?
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



                            </div>
                        </div>
                        <div className="playlistrankinglisttitle">좋아요 TOP</div>
                    </div>
                    <div className="playlistrankinglistwapper">
                        <div className="playlistrankinglistwrapper">
                            <div className="playlistrankinglistitemswrappe">
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
                                            닉네임몇글자제한이
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
                                            닉네임몇글자제한이
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
                                            닉네임몇글자제한이
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
                                            닉네임몇글자제한이
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
                                            닉네임몇글자제한이
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
                                            닉네임몇글자제한이
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
                                            닉네임몇글자제한이
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
                                            닉네임몇글자제한이
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
                                            닉네임몇글자제한이
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
                            </div>
                            <div className="playlistrankinglisttoggle">
                                <div className="rankinglistitemtogglecaption">팔로우</div>
                                <img
                                    className="rankinglistitemtogglebox-icon"
                                    alt=""
                                    src={FollowToggleButton}
                                />
                            </div>
                        </div>
                        <div className="playlistrankinglisttitle">
                            좋아요 표시한 플레이리스트
                        </div>
                    </div>
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
                </div>
            </div>
        )
}

export default PlayListMain01PlayListRangkingMain;