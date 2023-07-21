import { useCallback } from "react";
import "./PlayListDetail.css";
import Molu from  "../MainIMG/Molu.gif";
import Aru from  "../MainIMG/ARu.gif";
import MusicList from "../MainIMG/MusicList.png";
import Aris from "../MainIMG/Aris.gif";
import Axios from "axios";
import HeartImg from "../MainIMG/Heart.png";
import SearchCommentIcon from "../MainIMG/SearchCommentIcon.png";
import CommentIcon from "../MainIMG/CommentImg.png";
import PlayListPlayIcon from "../MainIMG/PlayListDetailPlayIcon.png";
import PlayListDetailHeart from "../MainIMG/PlayListDetailHeartIcon.png";
import PlayListDetaliAddMusic from "../MainIMG/PlayListDetailAddMusic.png";
import PlayListDetailOption from "../MainIMG/PlayListDetailOption.png";
import PlayListDetailDelete from "../MainIMG/PlayListDetailDelete.png";
import PlayListDetailCommentDelete from "../MainIMG/PlayListDetailCommentDelete.png";
import PlayListDetailClose from "../MainIMG/PlayListDetailClose.png";

const PlayListDetail = () => {
    const onIconsClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);

    const onPlayListDetailCloseIconClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);

    const Testalert = (()=>{
        alert("테스트");
    })

    return (
        <div className="playlistdetailframe">
            <div className="playlistdetail">
                <div className="playlistdetailtop">
                    <img
                        className="playlistdetailcover-icon"
                        alt=""
                        src={Aris}
                    />
                    <div className="playlistdetailinplaylistinfos">
                        <div className="playlistdetailinplaylisttitle">
                            코딩할때 듣기좋은음악
                        </div>
                        <div className="playlistdetailinplaylistuserin">
                            <img
                                className="playlistdetailprofileimage-icon"
                                alt=""
                                src={Aris}
                            />
                            <div className="playlistdetailinplaylistnickna">
                                춤추는 아리스
                            </div>
                        </div>
                        <div className="playlistdetailinplaylistinfo">
                            <p className="p">저는 지금 몰루 오케스트라를 듣고 있는 이상혁입니다<br/>
                            정말 재미있습니다 감사합니다<br/>
                                저는 피그마를 사랑합니다 피그마와 평생을 함께 할겁니다.
                            </p>
                        </div>
                        <div className="playlistdetailinplaylistinfobu">
                            <div className="playlistdetailbuttonbody">
                                <img
                                    className="playlisydetailplaybutton-icon"
                                    alt=""
                                    src={PlayListPlayIcon}
                                    onClick={Testalert}
                                />
                                <img
                                    className="playlisydetaillikebutton-icon"
                                    alt=""
                                    src={PlayListDetailHeart}
                                    onClick={Testalert}
                                />
                                <img
                                    className="playlisydetailinsertmusicbutto-icon"
                                    alt=""
                                    src={PlayListDetaliAddMusic}
                                    onClick={Testalert}
                                />
                                <img
                                    className="playlistdetaillistupdatebutton-icon"
                                    alt=""
                                    src={PlayListDetailOption}
                                    onClick={Testalert}
                                />
                                <img
                                    className="playlisydetailplaybutton-icon"
                                    alt=""
                                    src={PlayListDetailDelete}
                                    onClick={Testalert}
                                />
                            </div>
                            <div className="playlistdetailviewicons">
                                <div className="playlistdetailviewicon">
                                    <div className="playlistdetailviewcomment">
                                        <div className="playlistmessegecount">1000</div>
                                        <img
                                            className="playlistmessegeicon"
                                            alt=""
                                            src={CommentIcon}
                                        />
                                    </div>
                                    <div className="playlistdetailviewmusic">
                                        <div className="playlistmessegecount">1000</div>
                                        <img
                                            className="playlistmain03musicicon"
                                            alt=""
                                            src={MusicList}
                                        />
                                    </div>
                                </div>
                                <div className="playlistdetailviewlike">
                                    <img
                                        className="playlistdetailviewlikeicon"
                                        alt=""
                                        src={HeartImg}
                                    />
                                    <div className="playlistdetailviewlikecount">1000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="playlistdetaillist">
                    <div className="playlistdetailitems">
                        <div className="grpbtnset">
                            <img
                                className="playlistdetaillistupdatebutton-icon"
                                alt=""
                                src={PlayListDetailOption}
                            />
                            <img
                                className="playlistdetaillistdelete-icon"
                                alt=""
                                src={PlayListDetailClose}
                            />
                        </div>
                        <div className="txtlength">07:01</div>
                        <div className="txtsinger">이상혁</div>
                        <div className="txttitle">We live in the Jurassic Park</div>
                        <img
                            className="imgthumbnail-icon"
                            alt=""
                            src={Aru}
                        />
                        <div className="txtrank">1</div>
                    </div>
                </div>
                <div className="playlistdetailcommentframe">
                    <div className="playlistdetailcommentgroup1">
                        <div className="playlistdetailcommentheader">
                            <div className="commettilte">댓글</div>
                            <img
                                className="commettilteiconbody"
                                alt=""
                                src={SearchCommentIcon}
                            />
                        </div>
                        <div className="playlistdetailcommentform">
                            <textarea className="txtplaylistdetailform">
                                저는 피그마가 좋습니다 그러니까 코딩 안하겠습니다
                                감사합니다
                                즐겁습니다
                                집에가고싶습니다.
                            </textarea>
                            <div className="playlistdetailformheader">
                                <img
                                    className="playlistdetailcreaatecommentpr-icon"
                                    alt=""
                                    src={Aru}
                                />
                                <div className="playlistdetailcreatecommentpro">닉네임</div>
                                <div className="playlistdetailcreatecommentcre">댓글작성</div>
                                <div className="playlistdetailcreatecommentcre1">작성</div>
                            </div>
                        </div>
                    </div>
                    <div className="playlistdetailcommentswrapper">
                        <div className="playlistdetailcommentitems">
                            <img
                                className="playlistdetailcommenttextbody-icon"
                                alt=""
                                src="/playlistdetailcommenttextbody.svg"
                            />
                            <div className="playlistdetailcommenttext">
                                안녕하세요 저는 이상혁이구요 페이커 이고 사기꾼이에요
                                반갑습니다.
                            </div>
                            <div className="playlistdetailcommentinfo">
                                <div className="playlistdetailcommentprofilebo" />
                                <div className="playlistdetailcommentinfobody">
                                    <div className="playlistdetailcommentcreateday">
                                        <div className="playlistdetailcommentcreateday1">
                                            작성일 : 2024-07-05
                                        </div>
                                    </div>
                                    <img
                                        className="playlistdetailcommentdeletefra-icon"
                                        alt=""
                                        src={PlayListDetailCommentDelete}
                                    />
                                    <div className="playlistdetailcommentprofileim">
                                        <img
                                            className="playlistdetailcommentprofileim-icon"
                                            alt=""
                                            src={Molu}
                                        />
                                    </div>
                                    <div className="playlistdetailcommentnicknameb">
                                        <div className="playlistdetailcommentnickname">
                                            여기는 닉네임이 써지는 자리입니다.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    className="playlistdetailclose-icon"
                    alt=""
                    src={PlayListDetailClose}
                />
            </div>
        </div>
    );
};

export default PlayListDetail;
