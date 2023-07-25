import React from 'react';
import "./SearchSongModal.css";
import {useRecoilState} from "recoil";
import {SearchSongModalOpen} from "../recoil/SearchSongAtom";
import SearchBarIcon from "../MainIMG/SearchBarIcon.png";
import backIcon from "../MainIMG/backarrow.svg";
import songAddButton from "../MainIMG/SearchSongModalResultAddButton.png";
import molu from "../MainIMG/Molu.gif";
function SearchSongModal(props) {

    const [searchSongModalOpen, setSearchSongModalOpen] = useRecoilState(SearchSongModalOpen);

    const closeSearchModal = () => {
        setSearchSongModalOpen(false);
    }

    return (
        <div className="SearchSongModals">
            <div className="searchsongframe" onClick={closeSearchModal}></div>
                <div className="searchsongmodalgroup">
                    <div className="searchsongmodaltop">
                        <div className="searchsongmodalsearchtxt">곡 검색</div>
                        <div className="searchsongmodalsearch">
                            <input className="searchsongmodalsearchbody" />
                            <img
                                className="searchsongmodalsearchicon"
                                alt=""
                                src={SearchBarIcon}
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
                            <div className="searchsongmodalresultitem">
                                <img
                                    className="searchsongmodalresultcover-icon"
                                    alt=""
                                    src={molu}
                                />
                                <div className="searchsongmodalresulttitle">
                                    We live in the Jurassic Park
                                </div>
                                <div className="searchsongmodalresultsinger">이상혁</div>
                                <img
                                    className="searchsongmodalresultaddbutton-icon"
                                    alt=""
                                    src={songAddButton}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default SearchSongModal;