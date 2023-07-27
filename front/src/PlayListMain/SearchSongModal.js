import React, {useEffect, useRef, useState} from 'react';
import "./SearchSongModal.css";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    AddSongModalOpen,
    NextPageToken,
    SearchResults,
    SearchSongModalOpen,
    YoutubeSearchParam,
    VideoId
} from "../recoil/SearchSongAtom";
import SearchBarIcon from "../MainIMG/SearchBarIcon.png";
import backIcon from "../MainIMG/backarrow.svg";
import songAddButton from "../MainIMG/SearchSongModalResultAddButton.png";
import molu from "../MainIMG/Molu.gif";
import YouTube from 'react-youtube';
import axios from "axios";
import AddSongModal from "./AddSongModal";

function SearchSongModal(props) {
    const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search";
    const [searchSongModalOpen, setSearchSongModalOpen] = useRecoilState(SearchSongModalOpen);
    const [youtubeSearchParam, setYoutubeSearchParam] = useRecoilState(YoutubeSearchParam);//마지막으로 검색한 단어를 저장
    const [searchResults, setSearchResults] = useRecoilState(SearchResults); //영상 목록 저장
    const [videoId , setVideoId] = useRecoilState(VideoId);
    const [nextPageTokenValue, setNextPageTokenValue] = useRecoilState(NextPageToken); //nextPageToken 저장
    const [loading, setLoading] = useState(false);//로딩중일때 처리


    /*const youtubeApiKey = `${process.env.REACT_APP_YOUTUBE_KEY}`;*/
    const youtubeApiKey = "AIzaSyCe587-zYmedX4obUgR-iFRGm97-bln-Ww";
    /*const youtubeApiKey = "AIzaSyB4lBwQ7YtWtiSW2yhn6lbHtmHqKwRSUSs";*/
/*    /!*검색입력시 바로바로 변경(주의 !!)*!/
    useEffect(() => {
        handleSearch();
    }, [youtubeSearchParam]);*/


    const handleSearch = () => {
        axios.get(youtubeSearchUrl, {
            params: {
                key: youtubeApiKey,
                part: 'snippet',
                q: youtubeSearchParam,
                maxResults: 10,
                type: 'video',
                videoDuration: 'any'
            },
        })
            .then((response) => {
                setSearchResults(response.data.items);
                setNextPageTokenValue(response.data.nextPageToken);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        console.log("업데이트된 nextPageTokenValue:", nextPageTokenValue);
        console.log("업데이트된 youtubeSearchParam:",youtubeSearchParam);
    }, [nextPageTokenValue, youtubeSearchParam]);
    const closeSearchModal = () => {
        setSearchSongModalOpen(false);
    }
    const youtubeSearchOnChange = (e) => {
        setYoutubeSearchParam(e.target.value);
    }

    const modalContentRef = useRef();

  /*  const handleScroll = () => {
        const modalContent = modalContentRef.current;
        if (!modalContent) return;

        const { scrollTop, scrollHeight, clientHeight } = modalContent;
        if (scrollTop + clientHeight >= scrollHeight - 1) {
            fetchMoreResults();
        }
    };*/

    const fetchMoreResults = async () => {
        if (loading || !nextPageTokenValue) return;

        try {
            setLoading(true);

            const response = await axios.get(youtubeSearchUrl, {
                params: {
                    key: youtubeApiKey,
                    part: 'snippet',
                    q: youtubeSearchParam,
                    maxResults: 5,
                    type: 'video',
                    videoDuration: 'any',
                    pageToken : nextPageTokenValue
                },
            });

            const uniqueResults = response.data.items.filter((item) => (
                !searchResults.some((existingItem) => existingItem.id.videoId === item.id.videoId)
            ));

            setSearchResults((prevResults) => [...prevResults, ...uniqueResults]);
            setNextPageTokenValue(response.data.nextPageToken);
        } catch (error) {
            console.error('Error fetching more data:', error);
        } finally {
            setLoading(false);
        }
    };


/*    useEffect(() => {
        const modalContent = modalContentRef.current;
        if (modalContent) {
            modalContent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (modalContent) {
                modalContent.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);*/

    const [addSongModalOpen, setAddSongModalOpen] = useRecoilState(AddSongModalOpen);

    const showAddSongModalOpen = async (videoID) => {
        await setVideoId(videoID);
        await setSearchSongModalOpen(false);
        setAddSongModalOpen(true);
    };

    function decodeHTMLEntities(text) {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = text;
        return textarea.value;
    }

    return (
        <div className="SearchSongModals">
            <div className="searchsongframe" onClick={closeSearchModal}></div>
            <div className="searchsongmodalgroup">
                <div className="searchsongmodaltop">
                    <div className="searchsongmodalsearchtxt" >곡 검색</div>
                    <div className="searchsongmodalsearch">
                        <input className="searchsongmodalsearchbody" value={youtubeSearchParam}
                               placeholder="검색어를 입력해 주세요" onChange={youtubeSearchOnChange}/>
                        <img
                            className="searchsongmodalsearchicon"
                            alt=""
                            src={SearchBarIcon}
                            onClick={handleSearch}
                        />
                    </div>
                    <img
                        className="searchsongmodalback-icon"
                        alt=""
                        src={backIcon}
                    />
                </div>
                <div className="searchsongmodalresultgroup">
                    <div className="searchsongmodalresultitems" ref={modalContentRef}>
                        {searchResults.map((item, index) => (
                            <div className="searchsongmodalresultitem" key={index} >
                                <img
                                    className="searchsongmodalresultcover-icon"
                                    alt=""
                                    src={item.snippet.thumbnails.default.url}
                                />
                                <div className="searchsongmodalresulttitle">
                                    {decodeHTMLEntities(item.snippet.title)}
                                </div>
                                <div className="searchsongmodalresultsinger" >{decodeHTMLEntities(item.snippet.channelTitle)}</div>
                                <img
                                    className="searchsongmodalresultaddbutton-icon"
                                    alt=""
                                    src={songAddButton}
                                    onClick={() => showAddSongModalOpen(item.id.videoId)}
                                />
                            </div>
                        ))}
                    </div>
                        <div className="moreResult" onClick={fetchMoreResults}>more</div>
                </div>

            </div>

        </div>
    );
}

export default SearchSongModal;