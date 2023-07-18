import React from 'react';
import "./css/MypageMain.css";
import cover from "./svg/playlistcover.svg";
import message from "./svg/message.svg";
import logo from "./photo/wplieonlylogo.png";
import background from "./photo/backmian.png";
function MypageMain(props) {


    const data = sessionStorage.getItem('data') || localStorage.getItem('data');
    let nick = '';
    let profile = '';
    if (data) {
        const parsedData = JSON.parse(data);
        nick = parsedData[1];
        profile = parsedData[5];
        console.log(nick);
    }

    const profileimg = process.env.REACT_APP_BUCKET_URL;

    console.log(nick);
    return (
        <div className="mypageframe">
            <img className="image-8-icon" alt="" src={background} />
            <div className="middlebox" />
            <div className="memberprofile">
                <img className="org-3-icon" alt="" src={`${profileimg}/profile/${profile}`} />
            </div>
            <div className="memebersmypage">{nick}님 마이페이지</div>
            <div className="followbox">
                <div className="followtext">팔로워</div>
                <div className="follownumber">1200명</div>
            </div>
            <div className="followingbox">
                <div className="followingnumber">45명</div>
                <div className="followingtext">팔로잉</div>
            </div>
            <div className="myinfobox">
                <div className="onelineinfotext">
                    <div className="onelinetext">
                        안녕하세요 저는 인디음악을 좋아해요 오늘도 좋은하루 보내세요
                    </div>
                </div>
                <div className="onelinerbox">
                    <div className="onelinertext">한줄소개</div>
                    <img
                        className="communicationicon"
                        alt=""
                        src={message}
                    />
                </div>
            </div>

            <div className="mypageweplilogobox">
                <img
                    className="mypageweplilogo-icon"
                    alt=""
                    src={logo}
                />
            </div>
            <div className="mypagemenu">
                <div className="changeinfobox">
                    <div className="changeinfobutton">
                        <div className="surface" />
                        <div className="changeinfolabel">회원정보변경</div>
                    </div>
                </div>
                <div className="emailsendbox">
                    <div className="changeinfobutton">
                        <div className="surface" />
                        <div className="emailsendlabel">이메일 인증</div>
                    </div>
                </div>
                <div className="blacklistbox">
                    <div className="changeinfobutton">
                        <div className="surface" />
                        <div className="blacklistlabel">블랙리스트 설정</div>
                    </div>
                </div>
                <div className="secessionbox">
                    <div className="changeinfobutton">
                        <div className="surface" />
                        <div className="secessionlabel">회원탈퇴</div>
                    </div>
                </div>
                <div className="hpsendbox">
                    <div className="changeinfobutton">
                        <div className="surface" />
                        <div className="emailsendlabel">휴대폰 인증</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MypageMain;