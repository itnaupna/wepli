import React, {Component, useEffect, useState} from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MyPliSlider.css";
import CommentIcon from "../MainIMG/CommentImg.png";
import MusicList from "../MainIMG/MusicList.png";
import HeartImg from "../MainIMG/Heart.png";
import MoluCover from "../MainIMG/MoluCover.png";
import Axios from "axios";
import dayjs from 'dayjs';

function MyPliSlider() {

        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "50px",
            variableWidth:true,
            speed: 400,
            slidesToScroll: 1,
        };
        const profileimg = process.env.REACT_APP_BUCKET_URL;
        const [myPliL, setMyPli] = useState([]);

        useEffect(()=>{
            const myPliLUrl = "/api/lv1/p/playlist";
            Axios.get(myPliLUrl)
                .then(res =>
                    setMyPli(res.data));
        },[]);

        return (
            <div className="MyPliSliderBody">
                <Slider {...settings}>
                    {myPliL.length === 0? <h1 className="NoLogin">로그인 후 이용해주세요</h1>:
                        myPliL.map((item,idx) =>
                        <div style={{backgroundImage:`linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8)),url(${profileimg}/playlist/${item.img})`}} className="myplaylistitem" key={idx}>
                            <div className="myplaylistitembottom">
                                <div className="myplaylistiteminfo">
                                    <div className="myplaylistitemnumbers">
                                        <div className="myplaylistitemcommentwrapper">
                                            <div className="myplaylistitemcommentcount">{item.commentscount}</div>
                                            <img
                                                className="myplaylistitemcommenticon"
                                                alt=""
                                                src={CommentIcon}
                                            />
                                        </div>
                                        <div className="myplaylistitemsongwrapper">
                                            <div className="myplaylistitemcommentcount">{item.songscount}</div>
                                            <img
                                                className="myplaylistitemsongicon"
                                                alt=""
                                                src={MusicList}
                                            />
                                        </div>
                                    </div>
                                    <div className="myplaylistitemtags">
                                        <div className="myplaylistitemtag">{item.tag === ""?null:"#" + item.tag}</div>
                                        <div className="myplaylistitemcategory">{item.genre === ""?null:"#" + item.genre}</div>
                                    </div>
                                    <div className="myplaylistitemlikewrapper">
                                        <div className="myplaylistitemlikecount">{item.likescount}</div>
                                        <img
                                            className="myplaylistitemlikeicon"
                                            alt=""
                                            src={HeartImg}
                                        />
                                    </div>
                                </div>
                                <div className="myplaylistitemdescription">
                                    {item.nick}
                                </div>
                                <div className="myplaylistitemtitle">
                                    {item.title}
                                </div>
                            </div>
                            <div className="myplaylistitemtop">
                                <div className="myplaylistitemmakeday">생성일 : {dayjs(item.makeday).format('YYYY-MM-DD')}</div>
                                <img
                                    className="myplaylistitemthumbnail-icon"
                                    alt=""
                                    src={`${profileimg}/playlist/${item.img}`}
                                />
                            </div>
                        </div>
                    )}
                </Slider>
            </div>
        );

}
export default MyPliSlider;