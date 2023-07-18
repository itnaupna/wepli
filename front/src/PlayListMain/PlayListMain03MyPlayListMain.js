import "./PlayListMain03MyPlayListMain.css";
import PlayListMenu from "./PlayListMenu";
import HeartImg from  "../MainIMG/Heart.png";
import Molu from  "../MainIMG/Molu.gif";
import Aru from  "../MainIMG/ARu.gif";
import MusicList from "../MainIMG/MusicList.png";
import Follow from "../MainIMG/Follow.png";
import MypliIcon from "../MainIMG/MyPliIcon.png";
import RangkingIcon from "../MainIMG/RankingIcon.png";
import SearchIcon from "../MainIMG/SearchIcon.png";
import AddPliIcon from "../MainIMG/AddPliIcon.png";
import PlayListMyPlilogoTitle from "../MainIMG/PlayListMyPlilogoTitle.png";
import Aris from "../MainIMG/Aris.gif";
import SearchBarIcon from "../MainIMG/SearchBarIcon.png";
import SearchCommentIcon from "../MainIMG/SearchCommentIcon.png";
import SearchMusicListIcon from "../MainIMG/SearchMusicListIcon.png";
import SearchToggleIcon from "../MainIMG/SearchToggleIcon.png";
import MoluCover from "../MainIMG/MoluCover.png";
const PlayListMain03MyPlayListMain = () => {
    const reload = () =>{
        window.location.replace("");
    }
        return (
        <div className="playlistmain03">
            <div className="playlistmypliheader">
                <img
                    className="playlistmyplilogotitle-icon"
                    alt=""
                    src={PlayListMyPlilogoTitle}
                    onClick={reload}
                />
                {<PlayListMenu/>}
            </div>
            <div className="playlistmyplibody">
                <div className="myplaylistitem">
                    <div className="myplaylistitembottom">
                        <div className="myplaylistiteminfo">
                            <div className="myplaylistitemnumbers">
                                <div className="myplaylistitemcommentwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemcommenticon"
                                        alt=""
                                        src="/myplaylistitemcommenticon.svg"
                                    />
                                </div>
                                <div className="myplaylistitemsongwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemsongicon"
                                        alt=""
                                        src="/myplaylistitemsongicon.svg"
                                    />
                                </div>
                            </div>
                            <div className="myplaylistitemtags">
                                <div className="myplaylistitemtag">#비오는 날에 듣기좋은 노래에요 제발 들어주세요</div>
                                <div className="myplaylistitemcategory">#아니발라드아니야</div>
                            </div>
                            <div className="myplaylistitemlikewrapper">
                                <div className="myplaylistitemlikecount">1000</div>
                                <img
                                    className="myplaylistitemlikeicon"
                                    alt=""
                                    src="/myplaylistitemlikeicon.svg"
                                />
                            </div>
                        </div>
                        <div className="myplaylistitemdescription">
                            아루를 좋아하는 이상혁
                        </div>
                        <div className="myplaylistitemtitle">
                            일이삼사오육칠팔구십일이삼사오육칠팔구십
                        </div>
                    </div>
                    <div className="myplaylistitemtop">
                        <div className="myplaylistitemmakeday">생성일 : 2024-07-05</div>
                        <img
                            className="myplaylistitemthumbnail-icon"
                            alt=""
                            src="/myplaylistitemthumbnail@2x.png"
                        />
                    </div>
                </div>
                <div className="myplaylistitem">
                    <div className="myplaylistitembottom">
                        <div className="myplaylistiteminfo">
                            <div className="myplaylistitemnumbers">
                                <div className="myplaylistitemcommentwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemcommenticon"
                                        alt=""
                                        src="/myplaylistitemcommenticon.svg"
                                    />
                                </div>
                                <div className="myplaylistitemsongwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemsongicon"
                                        alt=""
                                        src="/myplaylistitemsongicon.svg"
                                    />
                                </div>
                            </div>
                            <div className="myplaylistitemtags">
                                <div className="myplaylistitemtag">#비오는 날에 듣기좋은 노래에요 제발 들어주세요</div>
                                <div className="myplaylistitemcategory">#발라드</div>
                            </div>
                            <div className="myplaylistitemlikewrapper">
                                <div className="myplaylistitemlikecount">1000</div>
                                <img
                                    className="myplaylistitemlikeicon"
                                    alt=""
                                    src="/myplaylistitemlikeicon.svg"
                                />
                            </div>
                        </div>
                        <div className="myplaylistitemdescription">
                            아루를 좋아하는 이상혁
                        </div>
                        <div className="myplaylistitemtitle">
                            일이삼사오육칠팔구십일이삼사오육칠팔구십
                        </div>
                    </div>
                    <div className="myplaylistitemtop">
                        <div className="myplaylistitemmakeday">생성일 : 2024-07-05</div>
                        <img
                            className="myplaylistitemthumbnail-icon"
                            alt=""
                            src="/myplaylistitemthumbnail@2x.png"
                        />
                    </div>
                </div>
                <div className="myplaylistitem">
                    <div className="myplaylistitembottom">
                        <div className="myplaylistiteminfo">
                            <div className="myplaylistitemnumbers">
                                <div className="myplaylistitemcommentwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemcommenticon"
                                        alt=""
                                        src="/myplaylistitemcommenticon.svg"
                                    />
                                </div>
                                <div className="myplaylistitemsongwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemsongicon"
                                        alt=""
                                        src="/myplaylistitemsongicon.svg"
                                    />
                                </div>
                            </div>
                            <div className="myplaylistitemtags">
                                <div className="myplaylistitemtag">#비오는 날에 듣기좋은 노래에요 제발 들어주세요</div>
                                <div className="myplaylistitemcategory">#아니발라드아니야</div>
                            </div>
                            <div className="myplaylistitemlikewrapper">
                                <div className="myplaylistitemlikecount">1000</div>
                                <img
                                    className="myplaylistitemlikeicon"
                                    alt=""
                                    src="/myplaylistitemlikeicon.svg"
                                />
                            </div>
                        </div>
                        <div className="myplaylistitemdescription">
                            아루를 좋아하는 이상혁
                        </div>
                        <div className="myplaylistitemtitle">
                            일이삼사오육칠팔구십일이삼사오육칠팔구십
                        </div>
                    </div>
                    <div className="myplaylistitemtop">
                        <div className="myplaylistitemmakeday">생성일 : 2024-07-05</div>
                        <img
                            className="myplaylistitemthumbnail-icon"
                            alt=""
                            src="/myplaylistitemthumbnail@2x.png"
                        />
                    </div>
                </div>
                <div className="myplaylistitem">
                    <div className="myplaylistitembottom">
                        <div className="myplaylistiteminfo">
                            <div className="myplaylistitemnumbers">
                                <div className="myplaylistitemcommentwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemcommenticon"
                                        alt=""
                                        src="/myplaylistitemcommenticon.svg"
                                    />
                                </div>
                                <div className="myplaylistitemsongwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemsongicon"
                                        alt=""
                                        src="/myplaylistitemsongicon.svg"
                                    />
                                </div>
                            </div>
                            <div className="myplaylistitemtags">
                                <div className="myplaylistitemtag">#비오는 날에 듣기좋은 노래에요 제발 들어주세요</div>
                                <div className="myplaylistitemcategory">#아니발라드아니야</div>
                            </div>
                            <div className="myplaylistitemlikewrapper">
                                <div className="myplaylistitemlikecount">1000</div>
                                <img
                                    className="myplaylistitemlikeicon"
                                    alt=""
                                    src="/myplaylistitemlikeicon.svg"
                                />
                            </div>
                        </div>
                        <div className="myplaylistitemdescription">
                            아루를 좋아하는 이상혁
                        </div>
                        <div className="myplaylistitemtitle">
                            일이삼사오육칠팔구십일이삼사오육칠팔구십
                        </div>
                    </div>
                    <div className="myplaylistitemtop">
                        <div className="myplaylistitemmakeday">생성일 : 2024-07-05</div>
                        <img
                            className="myplaylistitemthumbnail-icon"
                            alt=""
                            src="/myplaylistitemthumbnail@2x.png"
                        />
                    </div>
                </div>
                <div className="myplaylistitem">
                    <div className="myplaylistitembottom">
                        <div className="myplaylistiteminfo">
                            <div className="myplaylistitemnumbers">
                                <div className="myplaylistitemcommentwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemcommenticon"
                                        alt=""
                                        src="/myplaylistitemcommenticon.svg"
                                    />
                                </div>
                                <div className="myplaylistitemsongwrapper">
                                    <div className="myplaylistitemcommentcount">1000</div>
                                    <img
                                        className="myplaylistitemsongicon"
                                        alt=""
                                        src="/myplaylistitemsongicon.svg"
                                    />
                                </div>
                            </div>
                            <div className="myplaylistitemtags">
                                <div className="myplaylistitemtag">#비오는 날에 듣기좋은 노래에요 제발 들어주세요</div>
                                <div className="myplaylistitemcategory">#아니발라드아니야</div>
                            </div>
                            <div className="myplaylistitemlikewrapper">
                                <div className="myplaylistitemlikecount">1000</div>
                                <img
                                    className="myplaylistitemlikeicon"
                                    alt=""
                                    src="/myplaylistitemlikeicon.svg"
                                />
                            </div>
                        </div>
                        <div className="myplaylistitemdescription">
                            아루를 좋아하는 이상혁
                        </div>
                        <div className="myplaylistitemtitle">
                            일이삼사오육칠팔구십일이삼사오육칠팔구십
                        </div>
                    </div>
                    <div className="myplaylistitemtop">
                        <div className="myplaylistitemmakeday">생성일 : 2024-07-05</div>
                        <img
                            className="myplaylistitemthumbnail-icon"
                            alt=""
                            src="/myplaylistitemthumbnail@2x.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayListMain03MyPlayListMain;
