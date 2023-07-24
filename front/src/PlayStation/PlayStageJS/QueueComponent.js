import React, { useRef, useState } from 'react';
import '../PlayStageCss/QueueComponent.css';
import { Qdelete, Qdown, Qgrab, Qorder, Qplay, Qplaylist, Qremuser, Qup } from '../PlayStageImage/Icon';
import QueuePlaylist from './QueuePlaylist';
import QueueHistory from './QueueHistory';
import QueueStagePlaylist from './QueueStagePlaylist';
import QueueMypliItem from './QueueMypliItem';
import axios from 'axios';

const QueueComponent = () => {
    const searchKeyword = useRef();
    const [searchResult, setSearchResult] = useState([]);
    const [searchInfo, setSearchInfo] = useState({ keyword: '', token: '' });
    const SearchYoutube = async (keyword, token) => {
        let input = document.getElementsByClassName("queuesearchbarwrapper")[0];
        input.style.pointerEvents = "none";
        const str1 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
        const str2 = `&key=${process.env.REACT_APP_YOUTUBE_KEY}&maxResults=50&type=video`;
        const str3 = token ? `&pageToken=${token}` : '';
        if (!str3)
            setSearchResult([]);
        let result = (await axios.get(`${str1}${keyword}${str2}${str3}`)).data;
        setSearchInfo({ keyword, token: result.nextPageToken });
        setSearchResult(old=>[...old,...result.items]);
        input.style.pointerEvents = "inherit";
        // console.log(result);
    }
    return (
        <div className="stagequeuebody">
            <div className="queuesearchbarwrapper">
                <input className="queuesearchbar" placeholder='유튜브 검색키워드 입력' ref={searchKeyword} />
                <div style={{ paddingRight: '10px' }} onClick={(e) => {
                    SearchYoutube(searchKeyword.current.value, null);
                }}>🔍</div>
            </div>
            <div className="queuelistwrapper">
                <div className="queuelistleftside">
                    <div className="btnmyqueue" style={{ fontSize: '1.2rem', justifyContent: 'center' }}>대기열 관리</div>
                    <div className="btnmyqueue">
                        <div className="queueplaylistitemtitle">내 플리</div>
                        <div className="queueplaylistitemcount">000</div>
                    </div>
                    <div className="btnmyqueue">
                        <div className="queueplaylistitemtitle">스테이지 플리</div>
                        <div className="queueplaylistitemcount">000</div>
                    </div>
                    <div className="btnmyqueue">
                        <div className="queueplaylistitemtitle">재생 기록</div>
                        <div className="queueplaylistitemcount">000</div>
                    </div>
                    <div className="plisidewrapper">
                        <div className="queueplaylistwrapper">
                            <QueueMypliItem />
                            <QueueMypliItem />
                            <QueueMypliItem />
                        </div>
                        <div className="btnmakepli" style={{ justifyContent: 'center' }}>
                            플리 생성
                        </div>
                    </div>
                </div>
                <div className="queuelistrightside">
                    <div className="queuelistbtns">
                        <div className="queueallbutton">
                            <img className="playlist-icon" alt="" src={Qplaylist} />
                        </div>
                        <div className="queueallbutton">
                            <img className="delete-icon" alt="" src={Qdelete} />
                        </div>
                    </div>
                    <div className="qplaylistitems">
                        <React.Suspense fallback={<div>정보를 불러오는 중입니다.</div>}>
                            {searchResult.map((v, i) => <QueuePlaylist key={i} data={v} rank={i+1} />)}
                        </React.Suspense>
                        {/* <QueuePlaylist/> */}

                        {/* <QueueHistory/> */}
                        {/* <QueueStagePlaylist/> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueueComponent;