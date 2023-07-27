import React, {useCallback, useEffect, useState} from "react";
import "./PlayListDetail.css";
import Molu from "../MainIMG/Molu.gif";
import Aru from "../MainIMG/ARu.gif";
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
import {Link, useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import {useRecoilState} from "recoil";
import {AddSongModalOpen, SearchSongModalOpen, VideoId} from "../recoil/SearchSongAtom";
import SearchSongModal from "./SearchSongModal";
import AddSongModal from "./AddSongModal";

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

    const closBack = () => {
        closBacknavigate(-1);
    };
    const [plaListDetailResult, setPlaListDetailResult] = useState([]);
    const [plaListDetailComment, setPlaListDetailComment] = useState([]);
    const [plaListDetailInfo, setPlaListDetailInfo] = useState([]);
    const [plaListDetailSong, setPlaListDetailSong] = useState([]);


    useEffect(() => {
        const plaListDetailUrl = "/api/lv0/p/playdetail";
        Axios.get(plaListDetailUrl, {params: {idx: idx, curr: 1, cpp: 6}})
            .then(res => {
                setPlaListDetailResult(res.data);
                console.log(res.data);
                setPlaListDetailComment(res.data.comment);
                setPlaListDetailInfo(res.data.play[0]);
                setPlaListDetailSong(res.data.song);
            })
            .catch(res => console.log(res));
    }, []);

    useEffect(() => {
        console.log(plaListDetailInfo.img);
    }, [plaListDetailResult]);

    const [searchSongModalOpen, setSearchSongModalOpen] = useRecoilState(SearchSongModalOpen);
    const [addSongModalOpen, setAddSongModalOpen] = useRecoilState(AddSongModalOpen);
    const ShowSearchModalOpen = async () => {
        setSearchSongModalOpen(true);
        setAddSongModalOpen(false);
    }
    const [commentContent, setCommentContent] = useState("");
    const commentContentOnChange = (e) => {
        setCommentContent(e.target.value);
    }
    
    //댓글 작성 화면 이메일 or 휴대폰 인증받은사람만 가능하게 변경하기
    const writeComment = () =>{
        const commnetdata = {
            content: commentContent,
            playlistID: idx
        }
        Axios({
            method:"post",
            url: "/api/lv2/p/comment",
            data: commnetdata
        }).then(res => {
            alert("작성완료");
        }).catch(error => {
            console.log(error);
        })
    }

    //내것만 삭제하게 변경 (조건 추가해야함) 삭제완료후 댓글리스트 다시 불러오기
    const deleteComment = (commentIndex) =>{
        const commetdata = {
            idx: commentIndex,
            playlistID: idx
        }
        Axios({
            method:"delete",
            url: "/api/lv2/p/comment",
            data: commetdata
        }).then(res => {
            alert("삭제완효");
        }).catch(error => {
            console.log(error);
        })
    }
    
    //내것만 삭제하게 변경 (조건 추가해야함) 삭제완료후 이전 페이지 보내주기로 변경하기
    const deletePli = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            Axios.delete(`/api/lv1/p/list?idx=${idx}`)
                .then(res => {
                    alert("삭제완료");
                    closBack();
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            alert("삭제를 취소했습니다.");
        }
    }

    const likeOnClick = () =>{
        Axios({
            method:"post",
            url: "/api/lv2/p/like",
            params:{playlistID: idx,}
        }).then(res => {
            alert("좋아요");
        }).catch(error => {
            console.log(error);
        })
    }

    const songDelete = (idx) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            Axios.delete(`/api/lv1/p/song?idx=${idx}`)
                .then(res => {
                    alert("삭제완료");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            alert("삭제를 취소했습니다.");
        }
    }

    function formatTime(input) {
        const str = String(input).padStart(6, '0'); // 앞에 '0'을 채워서 6자리 문자열로 만듦

        const hours = str.substring(0, 2);
        const minutes = str.substring(2, 4);
        const seconds = str.substring(4);

        // 유효한 시간 형식인지 확인 후 반환
        if (parseInt(hours) >= 0 && parseInt(hours) <= 23 && parseInt(minutes) >= 0 && parseInt(minutes) <= 59 && parseInt(seconds) >= 0 && parseInt(seconds) <= 59) {
            return `${parseInt(hours) !== 0 ? hours + ':' : ''}${minutes}:${seconds}`;
        } else {
            return "Invalid input";
        }
    }
    const [videoId, setVideoId] = useRecoilState(VideoId);

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
                                {plaListDetailInfo.genre === "" ? null : "#장르 : " + plaListDetailInfo.genre}
                            </span>
                            <span className="tagitems">
                               {plaListDetailInfo.tag === "" ? null : "#태그 : " + plaListDetailInfo.tag}
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
                                        onClick={likeOnClick}
                                    />
                                </div>
                                <div className="playlistdetailbuttons" onClick={ShowSearchModalOpen}>
                                    <img
                                        className="playlistdetailinsertmusicbutto-icon"
                                        alt=""
                                        src={PlayListDetaliAddMusic}
                                    />
                                </div>
                                <Link to={"../pliupdate/" + idx} className="playlistdetailbuttons">
                                    <img
                                        className="playlistdetaillistupdatebutton-icon"
                                        alt=""
                                        src={PlayListDetailOption}
                                    />
                                </Link>
                                <div className="playlistdetailbuttons">
                                    <img
                                        className="playlistdetailplaybutton-icon"
                                        alt=""
                                        src={PlayListDetailDelete}
                                        onClick={deletePli}
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
                                        <div className="playlistmessegecount">{plaListDetailSong.length}</div>
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
                        plaListDetailSong.map((songList, idx) =>
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
                                        onClick={() =>songDelete(songList.idx)}
                                    />
                                </div>
                                <div className="txtlength">{formatTime(songList.songlength)}</div>
                                <div className="txtsinger">{songList.singer}</div>
                                <div className="txttitle">{songList.title}</div>
                                <img
                                    className="imgthumbnail-icon"
                                    alt=""
                                    src={songList.img === null ? `https://i.ytimg.com/vi/${songList.songaddress}/sddefault.jpg` : `${bucketURl}/songimg/${songList.img}`}
                                />
                                <div className="txtrank">{idx + 1}</div>
                            </div>
                        )}
                </div>
                <div className="playlistdetailcommentframe">
                    {
                        sessionStorage.getItem("data") == null ? null :
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
                            <textarea className="txtplaylistdetailform" placeholder="최대 길이는 200자 입니다" maxLength="200" value={commentContent} onChange={commentContentOnChange}>
                            </textarea>
                                <div className="playlistdetailformheader">
                                    <img
                                        className="playlistdetailcreaatecommentpr-icon"
                                        alt=""
                                        src={bucketURl + "/profile/" + JSON.parse(sessionStorage.getItem("data")).img}
                                    />
                                    <div
                                        className="playlistdetailcreatecommentpro">{JSON.parse(sessionStorage.getItem("data")).nick}</div>
                                    <div className="playlistdetailcreatecommentcre">댓글작성</div>
                                    <div className="playlistdetailcreatecommentcre1" onClick={writeComment}>작성</div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        plaListDetailComment.map((commentList, idx) =>
                            <div className="playlistdetailcommentswrapper" key={idx}>
                                <div className="playlistdetailcommentitems">
                            <span className="playlistdetailcommenttext">
                               {commentList.content}
                            </span>
                                    <div className="playlistdetailcommentinfo">
                                        <div className="playlistdetailcommentprofilebo"/>
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
                                                onClick={() => deleteComment(commentList.idx)}
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
            {addSongModalOpen && <AddSongModal setAddSongModalOpen={setAddSongModalOpen}/>}


        </div>
    );
};

export default PlayListDetail;
