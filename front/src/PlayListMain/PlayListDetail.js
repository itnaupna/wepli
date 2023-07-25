import {useCallback, useEffect, useState} from "react";
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
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import {useRecoilState} from "recoil";
import {SearchSongModalOpen} from "../recoil/SearchSongAtom";
import SearchSongModal from "./SearchSongModal";

const PlayListDetail = () => {
    const bucketURl = process.env.REACT_APP_BUCKET_URL;
    const idx = useParams().pliId;

    const onIconsClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);

    const onPlayListDetailCloseIconClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);

    const closBacknavigate = useNavigate();

    const closBack = () =>{
        closBacknavigate(-1);
    };
    const [plaListDetailResult, setPlaListDetailResult] = useState([]);
    const [plaListDetailComment, setPlaListDetailComment] = useState([]);
    const [plaListDetailInfo, setPlaListDetailInfo] = useState([]);
    const [plaListDetailSong , setPlaListDetailSong] = useState([]);


    useEffect(() =>{
        const plaListDetailUrl = "/api/lv0/p/playdetail";
        Axios.get(plaListDetailUrl, { params: {idx: idx, curr: 1, cpp: 6 } })
            .then(res => { setPlaListDetailResult(res.data); console.log(res.data);
                setPlaListDetailComment(res.data.comment);
                setPlaListDetailInfo(res.data.play[0]);
                setPlaListDetailSong(res.data.song);})
            .catch(res => console.log(res));
    },[]);

    useEffect(() =>{
        console.log(plaListDetailInfo.img);
    },[plaListDetailResult]);

    const [searchSongModalOpen, setSearchSongModalOpen] = useRecoilState(SearchSongModalOpen);

    const ShowSearchModalOpen = async () => {
        setSearchSongModalOpen(true);
    }
    return (
        <div className="playlistdetailframe">
            <div className="playlistdetail">
                <div className="playlistdetailtop">
                    <img
                        className="playlistdetailcover-icon"
                        alt=""
                        src={bucketURl + plaListDetailInfo.img}
                    />
                    <div className="playlistdetailinplaylistinfos">
                        <div className="playlistdetailinplaylisttitle">
                            {plaListDetailInfo.title}
                        </div>
                        <div className="tagcontainer">
                            <span className="genreitems">
                                {plaListDetailInfo.genre === "" ? null :"#장르 : " + plaListDetailInfo.genre}
                            </span>
                            <span className="tagitems">
                               {plaListDetailInfo.tag === "" ? null : "#태그 : "+ plaListDetailInfo.tag}
                            </span>
                        </div>
                        <div className="playlistdetailinplaylistuserin">
                            <img
                                className="playlistdetailprofileimage-icon"
                                alt=""
                                src={Aris}
                            />
                            <div className="playlistdetailinplaylistnickna">
                                {plaListDetailInfo.nick}
                            </div>
                        </div>
                        <div className="playlistdetailinplaylistinfo">
                            {
                                plaListDetailInfo.desc == "" ? null : plaListDetailInfo.desc
                            }
                        </div>
                        <div className="playlistdetailinplaylistinfobu">
                            <div className="playlistdetailbuttonbody">
                                <div className="playlistdetailbuttons">
                                    <img
                                        className="playlistdetailplaybutton-icon"
                                        alt=""
                                        src={PlayListPlayIcon}
                                    />
                                </div>
                                <div className="playlistdetailbuttons">
                                    <img
                                        className="playlistdetaillikebutton-icon"
                                        alt=""
                                        src={PlayListDetailHeart}
                                    />
                                </div>
                                <div className="playlistdetailbuttons" onClick={ShowSearchModalOpen}>
                                    <img
                                        className="playlistdetailinsertmusicbutto-icon"
                                        alt=""
                                        src={PlayListDetaliAddMusic}

                                    />
                                </div>
                                <div className="playlistdetailbuttons">
                                    <img
                                        className="playlistdetaillistupdatebutton-icon"
                                        alt=""
                                        src={PlayListDetailOption}
                                    />
                                </div>
                                <div className="playlistdetailbuttons">
                                    <img
                                        className="playlistdetailplaybutton-icon"
                                        alt=""
                                        src={PlayListDetailDelete}
                                    />
                                </div>
                            </div>
                            <div className="playlistdetailviewicons">
                                <div className="playlistdetailviewicon">
                                    <div className="playlistdetailviewcomment">
                                        <div className="playlistmessegecount">{plaListDetailInfo.commentscount}</div>
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
                                    <div className="playlistdetailviewlikecount">{plaListDetailInfo.likescount}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="playlistdetaillist">
                    {
                        plaListDetailSong.map ((songList, idx) =>
                            <div className="playlistdetailitems" key={idx}>
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
                                <div className="txtlength">{songList.songlength}</div>
                                <div className="txtsinger">{songList.singer}</div>
                                <div className="txttitle">{songList.title}</div>
                                <img
                                    className="imgthumbnail-icon"
                                    alt=""
                                    src={`${bucketURl}/songimg/${songList.img}`}
                                />
                                <div className="txtrank">{idx + 1}</div>
                            </div>
                    )}
                </div>
                <div className="playlistdetailcommentframe">
                    {  sessionStorage.getItem("data") == null ? null :
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
                            <textarea className="txtplaylistdetailform" placeholder="최대 길이는 200자 입니다" maxLength="200">
                            </textarea>
                            <div className="playlistdetailformheader">
                                <img
                                    className="playlistdetailcreaatecommentpr-icon"
                                    alt=""
                                    src={bucketURl + "/profile/" + JSON.parse(sessionStorage.getItem("data")).img}
                                />
                                    <div className="playlistdetailcreatecommentpro">{JSON.parse(sessionStorage.getItem("data")).nick}</div>
                                <div className="playlistdetailcreatecommentcre">댓글작성</div>
                                <div className="playlistdetailcreatecommentcre1">작성</div>
                            </div>
                        </div>
                    </div>
                        }
                    {
                        plaListDetailComment.map ((commentList, idx) =>
                        <div className="playlistdetailcommentswrapper" key={idx}>
                            <div className="playlistdetailcommentitems">
                            <span className="playlistdetailcommenttext">
                               {commentList.content}
                            </span>
                                <div className="playlistdetailcommentinfo">
                                    <div className="playlistdetailcommentprofilebo" />
                                    <div className="playlistdetailcommentinfobody">
                                        <div className="playlistdetailcommentcreateday">
                                            <div className="playlistdetailcommentcreateday1">
                                                작성일 : {dayjs(commentList.writeda).format('YYYY-MM-DD')}
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
                                            {commentList.writer}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <img
                    className="playlistdetailclose-icon"
                    alt=""
                    src={PlayListDetailClose}
                    onClick={closBack}
                />
            </div>
            {searchSongModalOpen && <SearchSongModal setSearchSongModalOpen={setSearchSongModalOpen}/>}


        </div>
    );
};

export default PlayListDetail;
