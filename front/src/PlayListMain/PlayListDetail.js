import { useCallback } from "react";
import "./PlayListDetail.css";
const PlayListDetail = () => {
    const onIconsClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);

    const onPlayListDetailCloseIconClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);

    return (
        <div className="playlistdetailframe">
            <div className="playlistdetail">
                <div className="playlistdetailtop">
                    <img
                        className="playlistdetailcover-icon"
                        alt=""
                        src="/playlistdetailcover@2x.png"
                    />
                    <div className="playlistdetailinplaylistinfos">
                        <div className="playlistdetailinplaylisttitle">
                            코딩할때 듣기좋은음악
                        </div>
                        <div className="playlistdetailinplaylistuserin">
                            <img
                                className="playlistdetailprofileimage-icon"
                                alt=""
                                src="/playlistdetailprofileimage@2x.png"
                            />
                            <div className="playlistdetailinplaylistnickna">
                                춤추는 아리스
                            </div>
                        </div>
                        <div className="playlistdetailinplaylistinfo">
                            <p className="p">{`저는 지금 몰루 오케스트라를 듣고 있는 이상혁입니다 `}</p>
                            <p className="p">정말 재미있습니다 감사합니다</p>
                            <p className="p">
                                저는 피그마를 사랑합니다 피그마와 평생을 함께 할겁니다.
                            </p>
                        </div>
                        <div className="playlistdetailinplaylistinfobu">
                            <div className="playlistdetailbuttonbody">
                                <img
                                    className="playlisydetailplaybutton-icon"
                                    alt=""
                                    src="/playlisydetailplaybutton@2x.png"
                                />
                                <img
                                    className="playlisydetaillikebutton-icon"
                                    alt=""
                                    src="/playlisydetaillikebutton@2x.png"
                                />
                                <img
                                    className="playlisydetailinsertmusicbutto-icon"
                                    alt=""
                                    src="/playlisydetailinsertmusicbutton@2x.png"
                                />
                                <img
                                    className="playlistdetaillistupdatebutton-icon"
                                    alt=""
                                    src="/playlistdetaillistupdatebutton.svg"
                                />
                                <img
                                    className="playlisydetailplaybutton-icon"
                                    alt=""
                                    src="/playlisydetaildeletebutton@2x.png"
                                />
                            </div>
                            <div className="playlistdetailviewicons">
                                <div className="playlistdetailviewicon">
                                    <div className="playlistdetailviewcomment">
                                        <div className="playlistmessegecount">1000</div>
                                        <img
                                            className="playlistmessegeicon"
                                            alt=""
                                            src="/playlistmessegeicon.svg"
                                        />
                                    </div>
                                    <div className="playlistdetailviewmusic">
                                        <div className="playlistmessegecount">1000</div>
                                        <img
                                            className="playlistmain03musicicon"
                                            alt=""
                                            src="/playlistmain03musicicon.svg"
                                        />
                                    </div>
                                </div>
                                <div className="playlistdetailviewlike">
                                    <img
                                        className="playlistdetailviewlikeicon"
                                        alt=""
                                        src="/playlistdetailviewlikeicon.svg"
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
                                src="/playlistdetaillistoption.svg"
                            />
                            <img
                                className="playlistdetaillistdelete-icon"
                                alt=""
                                src="/playlistdetaillistdelete.svg"
                            />
                        </div>
                        <div className="txtlength">07:01</div>
                        <div className="txtsinger">이상혁</div>
                        <div className="txttitle">We live in the Jurassic Park</div>
                        <img
                            className="imgthumbnail-icon"
                            alt=""
                            src="/imgthumbnail@2x.png"
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
                                src="/commettilteiconbody.svg"
                            />
                        </div>
                        <div className="playlistdetailcommentform">
                            <div className="txtplaylistdetailform">
                                <p className="p">
                                    저는 피그마가 좋습니다 그러니까 코딩 안하겠습니다
                                </p>
                                <p className="p">감사합니다</p>
                                <p className="p">즐겁습니다</p>
                                <p className="p">집에가고싶습니다.</p>
                            </div>
                            <div className="playlistdetailformheader">
                                <img
                                    className="playlistdetailcreaatecommentpr-icon"
                                    alt=""
                                    src="/playlistdetailcreaatecommentprofileimage@2x.png"
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
                                        src="/playlistdetailcommentdeleteframe.svg"
                                    />
                                    <div className="playlistdetailcommentprofileim">
                                        <img
                                            className="playlistdetailcommentprofileim-icon"
                                            alt=""
                                            src="/playlistdetailcommentprofileimage@2x.png"
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
                    src="/playlistdetailclose.svg"
                />
            </div>
        </div>
    );
};

export default PlayListDetail;
