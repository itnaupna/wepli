import React, { useEffect, useState } from 'react';
import backarrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import Axios from 'axios';

function FollowingAndFollowerModal({setFollowingAndFollowerModalOpen, value, nick}) {

    const closeFollowingAndFollowModal = async () => {
        await setFollowingAndFollowerModalOpen(false);
    }
    console.log(nick);
    const [followMember, setFollowMemeber] = useState([]);

    const followerListHandler = () => {
        Axios({
            method: "get",
            url: "/api/lv2/f/follower",
            params: {userNick: nick}
        }).then(res => {
            setFollowMemeber(res.data);
            console.log(res.data);
        }).catch(error => {
            alert(error);
        })
    }
    useEffect(() => {
        if(value === "follower") {
            followerListHandler();
            console.log(value);
        } else {
            console.log(value);
        }
    }, [])

    return (
        <div>
            <div className="followmodalframe" onClick={closeFollowingAndFollowModal}></div>
            <div className="followmodalwapper">
                <div className="followmodalgroup">
                    <div className="followmodallayout">
                        <div className="followmodalheader">
                            <img
                                className="followmodalmodalarrow-icon"
                                alt=""
                                src={backarrow}
                                onClick={closeFollowingAndFollowModal}
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
                                    <div className="followmodalmembercounttext">
                                        팔로우수
                                    </div>
                                </div>
                                <div className="followmodalbtngroup">
                                    <div className="followmodalbtnsection">
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

export default FollowingAndFollowerModal;