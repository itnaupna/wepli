import { useCallback } from "react";
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
import PlayListSave from "../MainIMG/playListSave.png";
import "./AddPlayList.css";
const AddPlayLsit = () => {
    const onIconsClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);

    const onPlayListaddCloseIconClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);


    return (
        <div className="playlistaddframe">
            <div className="playlistadd">
                <div className="playlistaddtop">
                    <img
                        className="playlistaddcover-icon"
                        alt=""
                        src={Aris}
                    />
                    <div className="playlistaddinplaylistinfos">
                        <input className="playlistaddinplaylisttitle" value="" placeholder="이름을 입력해 주세요"/>

                        <div className="playlistaddinplaylistuserin">
                            <img
                                className="playlistaddprofileimage-icon"
                                alt=""
                                src={Aris}
                            />
                            <div className="playlistaddinplaylistnickna">
                                춤추는 아리스
                            </div>
                        </div>
                        <textarea className="playlistaddinplaylistinfo">
                           저는 지금 몰루 오케스트라를 듣고 있는 이상혁입니다
                                정말 재미있습니다 감사합니다
                                저는 피그마를 사랑합니다 피그마와 평생을 함께 할겁니다.

                        </textarea>
                        <div className="playlistaddinplaylistinfobu">
                            <div className="playlistaddbuttonbody">
                                <img
                                    className="playlistaddinsertmusicbutto-icon"
                                    alt=""
                                    src={PlayListDetaliAddMusic}

                                />
                                <img
                                    className="playlistaddplaybutton-icon"
                                    alt=""
                                    src={PlayListSave}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="playlistaddlist">
                    <div className="playlistadditems">
                        <div className="grpbtnset">
                            <img
                                className="playlistaddlistupdatebutton-icon"
                                alt=""
                                src={PlayListDetailOption}
                            />
                            <img
                                className="playlistaddlistdelete-icon"
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
                <img
                    className="playlistaddclose-icon"
                    alt=""
                    src={PlayListDetailClose}
                />
            </div>
        </div>
    );
};

export default AddPlayLsit;
