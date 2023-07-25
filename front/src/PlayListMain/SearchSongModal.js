import React, {useState} from 'react';
import "./SearchSongModal.css";
import {useRecoilState} from "recoil";
import {SearchSongModalOpen} from "../recoil/SearchSongAtom";
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
    const youtubeApiKey = `${process.env.REACT_APP_YOUTUBE_KEY}`;

    const handleSearch = async () => {
        try {
            const response = await axios.get(youtubeSearchUrl, {
                params: {
                    key: youtubeApiKey,
                    part: 'snippet',
                    q: youtubeSearchParam,
                    maxResults: 5,
                    type: 'video',
                    videoDuration: 'any',
                },
            });

            setSearchResults(response.data.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    /*     axios.get('https://www.googleapis.com/youtube/v3/search', { params })
             .then(res =>{
                 console.log(res.data);
             })
             .catch(error =>{
                 console.log(error);
             })*/
    const closeSearchModal = () => {
        setSearchSongModalOpen(false);
    }
    const youtubeSearchOnChange = (e) => {
        setYoutubeSearchParam(e.target.value);
    }

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
                    <div className="searchsongmodalresultitems">
                        {searchResults.map((item, idx) => (
                            <div className="searchsongmodalresultitem" key={item.id.videoId}>
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