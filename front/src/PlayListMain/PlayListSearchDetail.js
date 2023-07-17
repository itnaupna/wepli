import React, {useCallback, useEffect, useState} from 'react';
import Aris from "../MainIMG/Aris.gif";
import SearchCommentIcon from "../MainIMG/SearchCommentIcon.png";
import MusicList from "../MainIMG/MusicList.png";
import HeartImg from "../MainIMG/Heart.png";
import Axios from "axios";

function PlayListSearchDetail({searchResult}) {
    return (
        <div className="playlistsearchbody">
            <div className="playlistitemwrapperframe">
                {searchResult.length === 0? <h1 className="NoResearch">검색 결과가 없습니다</h1>:
                    searchResult?.map((item, idx)=>
                        <div className="playlistsearchitem">
                            <img
                                className="playlistsearchthumbnail-icon"
                                alt=""
                                src={Aris}
                            />
                            <div className="playlistsearchinfowrapper">
                                <div className="playlistsearchtagswrapper">
                                    <div className="playlistsearchcategory">
                                        #{item.genre}
                                    </div>
                                    <div className="playlistsearchtag">#{item.tag}</div>
                                </div>
                                <div className="playlistsearchcommentwrapper">
                                    <div className="playlistsearchcommentcount">1000</div>
                                    <img
                                        className="playlistsearchcommenticonwrapp"
                                        alt=""
                                        src={SearchCommentIcon}
                                    />
                                </div>
                                <div className="playlistsearchsongwrapper">
                                    <div className="playlistsearchcommentcount">1000</div>
                                    <img
                                        className="playlistsearchcommenticonwrapp"
                                        alt=""
                                        src={MusicList}
                                    />
                                </div>
                                <div className="playlistsearchmakeday">생성일 : {item.makeday}</div>
                                <div className="playlistsearchowner">{item.nick}</div>
                                <div className="playlistsearchtitle">{item.title}</div>
                                <div className="playlistsearchlikewrapper">
                                    <img
                                        className="playlistsearchlikeicon"
                                        alt=""
                                        src={HeartImg}
                                    />
                                    <div className="playlistsearchlikecount">{item.likescount}</div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default PlayListSearchDetail;