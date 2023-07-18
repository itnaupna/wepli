import React, {Component, useEffect} from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MyPliSlider.css";
import CommentIcon from "../MainIMG/CommentImg.png";
import MusicList from "../MainIMG/MusicList.png";
import HeartImg from "../MainIMG/Heart.png";
import MoluCover from "../MainIMG/MoluCover.png";
import Axios from "axios";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "50px",
            variableWidth:true,
            speed: 400,
            slidesToScroll: 1,
        };
        return (
            <div className="MyPliSliderBody">
                <Slider {...settings}>

                    <div className="myplaylistitem">
                        <div className="myplaylistitembottom">
                            <div className="myplaylistiteminfo">
                                <div className="myplaylistitemnumbers">
                                    <div className="myplaylistitemcommentwrapper">
                                        <div className="myplaylistitemcommentcount">1000</div>
                                        <img
                                            className="myplaylistitemcommenticon"
                                            alt=""
                                            src={CommentIcon}
                                        />
                                    </div>
                                    <div className="myplaylistitemsongwrapper">
                                        <div className="myplaylistitemcommentcount">1000</div>
                                        <img
                                            className="myplaylistitemsongicon"
                                            alt=""
                                            src={MusicList}
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
                                        src={HeartImg}
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
                                src={MoluCover}
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
                                            src={CommentIcon}
                                        />
                                    </div>
                                    <div className="myplaylistitemsongwrapper">
                                        <div className="myplaylistitemcommentcount">1000</div>
                                        <img
                                            className="myplaylistitemsongicon"
                                            alt=""
                                            src={MusicList}
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
                                        src={HeartImg}
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
                                src={MoluCover}
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
                                            src={CommentIcon}
                                        />
                                    </div>
                                    <div className="myplaylistitemsongwrapper">
                                        <div className="myplaylistitemcommentcount">1000</div>
                                        <img
                                            className="myplaylistitemsongicon"
                                            alt=""
                                            src={MusicList}
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
                                        src={HeartImg}
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
                                src={MoluCover}
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
                                            src={CommentIcon}
                                        />
                                    </div>
                                    <div className="myplaylistitemsongwrapper">
                                        <div className="myplaylistitemcommentcount">1000</div>
                                        <img
                                            className="myplaylistitemsongicon"
                                            alt=""
                                            src={MusicList}
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
                                        src={HeartImg}
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
                                src={MoluCover}
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
                                            src={CommentIcon}
                                        />
                                    </div>
                                    <div className="myplaylistitemsongwrapper">
                                        <div className="myplaylistitemcommentcount">1000</div>
                                        <img
                                            className="myplaylistitemsongicon"
                                            alt=""
                                            src={MusicList}
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
                                        src={HeartImg}
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
                                src={MoluCover}
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
                                            src={CommentIcon}
                                        />
                                    </div>
                                    <div className="myplaylistitemsongwrapper">
                                        <div className="myplaylistitemcommentcount">1000</div>
                                        <img
                                            className="myplaylistitemsongicon"
                                            alt=""
                                            src={MusicList}
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
                                        src={HeartImg}
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
                                src={MoluCover}
                            />
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}