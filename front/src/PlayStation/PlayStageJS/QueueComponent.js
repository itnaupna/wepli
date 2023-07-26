import React, { useEffect, useRef, useState } from 'react';
import '../PlayStageCss/QueueComponent.css';
import { Qdelete, Qplaylist } from '../PlayStageImage/Icon';
import QueuePlaylist from './QueuePlaylist';
import QueueMypliItem from './QueueMypliItem';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ButtonTypeAtom, MyQListAtom, ResultItemsInStageAtom, RoomQListAtom } from '../../recoil/StageDataAtom';
import { LoginStatusAtom } from '../../recoil/LoginStatusAtom';
import QueuePlaylist2 from './QueuePlaylist2';

const QueueComponent = () => {
    const searchKeyword = useRef();
    const [searchResult, setSearchResult] = useRecoilState(ResultItemsInStageAtom);
    const [searchInfo, setSearchInfo] = useState({ keyword: '', token: '' });
    const MyQList = useRecoilValue(MyQListAtom);
    const RoomQList = useRecoilValue(RoomQListAtom);
    const [ButtonType, setButtonType] = useRecoilState(ButtonTypeAtom);
    const listRef = useRef();
    let cancelTokenSource;
    const IsLogin = useRecoilValue(LoginStatusAtom);

    const [myPlaylists, setMyPlaylists] = useState([]);
    const SearchYoutube = async (keyword, token) => {
        const input = document.getElementsByClassName("queuesearchbarwrapper")[0];
        input.style.pointerEvents = "none";

        const str1 = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
        const str2 = `&key=${process.env.REACT_APP_YOUTUBE_KEY}&maxResults=50&type=video`;
        const str3 = token ? `&pageToken=${token}` : '';


        cancelTokenSource = axios.CancelToken.source(); // 1. 취소 토큰 생성

        if (!str3) {
            setSearchResult([]);
        }

        try {
            const result = await axios.get(`${str1}${keyword}${str2}${str3}`, {
                cancelToken: cancelTokenSource.token, // 2. 요청에 취소 토큰 설정
            });

            setSearchInfo({ keyword, token: result.data.nextPageToken });
            setSearchResult(old => [...old, ...result.data.items]);
        } catch (error) {
            if (axios.isCancel(error)) {
                // 요청이 취소된 경우
                console.log('요청이 취소되었습니다.', error.message);
            } else {
                // 그 외의 오류 처리
                console.error('오류 발생:', error);
            }
        }

        input.style.pointerEvents = "inherit";

    };

    // 취소 기능을 사용하여 요청을 취소하는 함수
    const cancelSearch = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel('요청이 취소되었습니다.');
        }
    };

    const loadMyPlaylists = async () => {
        if (!IsLogin) { setMyPlaylists([]); return; }
        let request = await axios.get("/api/lv1/p/playlist");
        setMyPlaylists(request.data);
        // console.log(myPlaylists);
    }

    const loadMyQueue = () => {
        setButtonType('myqueue');
        setSearchResult(MyQList);
    }
    
    useEffect(()=>{
        if(ButtonType==='myqueue')
            setSearchResult(MyQList);
        else if(ButtonType === 'stagequeue')
            setSearchResult(RoomQList);
    },[MyQList,RoomQList,ButtonType]);

    const loadStageQueue = () => {
        setButtonType('stagequeue');
        setSearchResult(RoomQList);
        console.log(RoomQList);
    }

    useEffect(() => {
        loadMyPlaylists()
    }, [IsLogin]);


    return (
        <div className="stagequeuebody">
            {IsLogin &&
                <div className="queuesearchbarwrapper">
                    <input className="queuesearchbar" placeholder='유튜브 검색키워드 입력' ref={searchKeyword}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                setButtonType('search');
                                SearchYoutube(searchKeyword.current.value, null);
                            }
                        }} />
                    <div style={{ paddingRight: '10px' }} onClick={(e) => {
                        setButtonType('search');
                        SearchYoutube(searchKeyword.current.value, null);
                    }}>🔍</div>
                </div>
            }
            <div className="queuelistwrapper">
                <div className="queuelistleftside">
                    <div className="btnmyqueue" style={{ fontSize: '1.2rem', justifyContent: 'center', cursor: 'default' }}>대기열 관리</div>
                    {IsLogin &&
                        <div className="btnmyqueue">
                            <div className="queueplaylistitemtitle" onClick={loadMyQueue}>내 플리</div>
                            <div className="queueplaylistitemcount">{MyQList.length}</div>
                        </div>
                    }
                    <div className="btnmyqueue">
                        <div className="queueplaylistitemtitle" onClick={loadStageQueue}>스테이지 플리</div>
                        <div className="queueplaylistitemcount">{RoomQList.length}</div>
                    </div>
                    <div className="btnmyqueue">
                        <div className="queueplaylistitemtitle">재생 기록</div>
                        <div className="queueplaylistitemcount">000</div>
                    </div>
                    {IsLogin &&
                        <div className="plisidewrapper">
                            <div className="queueplaylistwrapper">
                                {myPlaylists && myPlaylists.map((v, i) => <QueueMypliItem data={v} key={i} />)}
                            </div>
                            <div className="btnmakepli" style={{ justifyContent: 'center' }}>
                                플리 생성
                            </div>
                        </div>
                    }
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
                    <div className="qplaylistitems" ref={listRef}>
                        {
                            searchResult?.length > 0
                                ? ButtonType === 'search'
                                    ? searchResult.map((v, i) => <QueuePlaylist key={i} data={v} rank={i + 1} index={i} />)
                                    : ButtonType === 'stagequeue'
                                        ? searchResult.map((v, i) =>
                                            Object.entries(v).map(([k, vl]) => <QueuePlaylist2 key={i} data={vl} nick={k} rank={i + 1} index={i} />)
                                        )
                                        : searchResult.map((v, i) => <QueuePlaylist2 key={i} data={v} rank={i + 1} index={i} />)
                                : <div style={{ alignSelf: 'stretch', margin: '10px', textAlign: 'center' }}>
                                    표시할 정보가 없습니다.
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default QueueComponent;