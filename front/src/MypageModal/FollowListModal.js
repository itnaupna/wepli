import React from 'react';
import "./css/FollowListModal.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
function FollowListModal({setisFollowListModalOpen}) {

    const closeFollowListModal = async () => {
        await setisFollowListModalOpen(false);
    }



    return (
        <div>
            <div className="followmodalframe" onClick={closeFollowListModal}></div>
                <div className="followmodalwapper">
                    <div className="followmodalgroup">
                        <div className="followmodallayout">
                            <div className="followmodalheader">
                                <img
                                    className="followmodalmodalarrow-icon"
                                    alt=""
                                    src={backarrow}
                                />
                                <div className="followmodaltitle">
                                    <div className="followmodalwepli">WEPLi</div>
                                </div>
                                <img
                                    className="followmodalwplieonlylogo-5-icon"
                                    alt=""
                                    src={logo}
                                />
                            </div>
                            <div className="followmodalveticalframe">
                                <div className="followmodallist">
                                    <img
                                        className="followmodalthumbnail-icon"
                                        alt=""
                                        src="/followmodalthumbnail@2x.png"
                                    />
                                    <div className="followmodalinfogroup">
                                        <div className="followmodalmembernicknametext">
                                            열글자까지가능합니다
                                        </div>
                                        <div className="followmodalmembercounttext">
                                            닉네임몇글자제한이
                                        </div>
                                    </div>
                                    <div className="followmodalbtngroup">
                                        <div className="followmodalbtnsection">
                                            <div className="followmodalblackbtnframe">
                                                <div className="followmodalblackbtnrectangle" />
                                                <button type={'button'} className="followmodalblackbtntext">블랙</button>
                                            </div>
                                            <div className="followmodalfollowbtnframe">
                                                <div className="followmodalfollowbtnrectangle" />
                                                <button type={'button'} className="followmodalfollowbtntext">팔로우</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default FollowListModal;