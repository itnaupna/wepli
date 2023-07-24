import React, {useEffect, useState} from 'react';
import "./css/FollowListModal.css";
import backarrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import axios from "axios";
function FollowListModal({setisFollowListModalOpen}) {

    const closeFollowListModal = async () => {
        await setisFollowListModalOpen(false);
    }

    const [followMember, setFollowMemeber] = useState([]);

    useEffect(()=>{
        handleFollowList();
        followMember.forEach(member => {
            console.log("닉네임:", member.nickname);
        });
    },[]);

    const handleFollowList = () => {
        const url = "/api/lv2/f/follow";

        axios
        .get(url).then(res => {
            setFollowMemeber(res.data);
            console.log("follow 멤버", res.data);
        });
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
                                        src={logo}
                                    />
                                    <div className="followmodalinfogroup">
                                        <div className="followmodalmembernicknametext">
                                            닉네임들어가는자리
                                        </div>
                                        {/*<div className="followmodalmembercounttext">*/}
                                        {/*    */}
                                        {/*</div>*/}
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