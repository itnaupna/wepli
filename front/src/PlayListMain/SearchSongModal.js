import React, {useEffect, useRef, useState} from 'react';
import "./SearchSongModal.css";
import {useRecoilState, useRecoilValue} from "recoil";
import {NextPageToken, SearchSongModalOpen} from "../recoil/SearchSongAtom";
import SearchBarIcon from "../MainIMG/SearchBarIcon.png";
import backIcon from "../MainIMG/backarrow.svg";
import songAddButton from "../MainIMG/SearchSongModalResultAddButton.png";
import molu from "../MainIMG/Molu.gif";
import YouTube from 'react-youtube';
import axios from "axios";

function SearchSongModal(props) {
    const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search";
    const [searchSongModalOpen, setSearchSongModalOpen] = useRecoilState(SearchSongModalOpen);
    const [youtubeSearchParam, setYoutubeSearchParam] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    /*const [nextPageTokenValue, setNextPageTokenValue] = useRecoilState(NextPageToken);*/
    const [nextPageTokenValue, setNextPageTokenValue] = useRecoilState(NextPageToken);
    const [loading, setLoading] = useState(false);
    /*const youtubeApiKey = `${process.env.REACT_APP_YOUTUBE_KEY}`;*/
    /*const youtubeApiKey = "AIzaSyCe587-zYmedX4obUgR-iFRGm97-bln-Ww";*/
    const youtubeApiKey = "AIzaSyB4lBwQ7YtWtiSW2yhn6lbHtmHqKwRSUSs";
/*    /!*검색입력시 바로바로 변경(주의 !!)*!/
    useEffect(() => {
        handleSearch();
    }, [youtubeSearchParam]);*/


    const handleSearch = async () => {
        try {
            const response = await axios.get(youtubeSearchUrl, {
                params: {
                    key: youtubeApiKey,
                    part: 'snippet',
                    q: youtubeSearchParam,
                    maxResults: 5,
                    type: 'video',
                    videoDuration: 'any'
                },
            });

            setSearchResults(response.data.items);
            setNextPageTokenValue(response.data.nextPageToken);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log("업데이트된 nextPageTokenValue:", nextPageTokenValue);
        alert(nextPageTokenValue);
    }, [nextPageTokenValue]);
    const closeSearchModal = () => {
        setSearchSongModalOpen(false);
    }
    const youtubeSearchOnChange = (e) => {
        setYoutubeSearchParam(e.target.value);
    }

    const modalContentRef = useRef();

    const handleScroll = () => {
        const modalContent = modalContentRef.current;
        if (!modalContent) return;

        const { scrollTop, scrollHeight, clientHeight } = modalContent;
        if (scrollTop + clientHeight >= scrollHeight - 0) {
            fetchMoreResults();
        }
    };

    const fetchMoreResults = async () => {
        console.log(nextPageTokenValue , "넥스트");
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
                    pageToken: nextPageTokenValue,
                },
            });

            setSearchResults((prevResults) => [...prevResults, ...response.data.items]);
            setNextPageTokenValue(response.data.nextPageToken);
        } catch (error) {
            console.error('Error fetching more data:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const modalContent = modalContentRef.current;
        if (modalContent) {
            modalContent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (modalContent) {
                modalContent.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="SearchSongModals">
            <div className="searchsongframe" onClick={closeSearchModal}></div>
            <div className="searchsongmodalgroup">
                <div className="searchsongmodaltop">
                    <div className="searchsongmodalsearchtxt">곡 검색</div>
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
                        {searchResults.map((item) => (
                            <div className="searchsongmodalresultitem" key={item.id.videoId} >
                                <img
                                    className="searchsongmodalresultcover-icon"
                                    alt=""
                                    src={item.snippet.thumbnails.default.url}
                                />
                                <div className="searchsongmodalresulttitle">
                                    {item.snippet.title}
                                </div>
                                <div className="searchsongmodalresultsinger">{item.snippet.channelTitle}</div>
                                <img
                                    className="searchsongmodalresultaddbutton-icon"
                                    alt=""
                                    src={songAddButton}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchSongModal;