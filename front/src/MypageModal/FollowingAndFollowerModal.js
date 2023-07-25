import React, { useEffect, useState } from 'react';
import backarrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FollowingAndFollowerModal({setFollowingAndFollowerModalOpen, value, nick}) {
    const bucket = process.env.REACT_APP_BUCKET_URL;
    const [followMember, setFollowMemeber] = useState([]);
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();  
    const closeFollowingAndFollowModal = async () => {
        await setFollowingAndFollowerModalOpen(false);
    }
    
    const followerListHandler = () => {
        Axios({
            method: "get",
            url: "/api/lv2/f/follower",
            params: {userNick: nick}
        }).then(res => {
            setFollowMemeber(res.data);
        }).catch(error => {
            alert(error);
        })
    }

    const followingListHandler = () => {
        Axios({
            method: "get",
            url: "/api/lv2/f/follow",
            params: {userNick: nick}
        }).then(res => {
            setFollowMemeber(res.data);
        }).catch(error => {
            alert(error);
        })
    }

    const followToggleHandler = (target) => {
        console.log(target);
        Axios({
            method: "post",
            url: "/api/lv2/f/followtoggle",
            params: {target : target}
        }).then(res => {
            if(value === "follower") {
                followerListHandler();
                console.log(value);
            } else {
                followingListHandler();
                console.log(value);
            }
        }).catch(error => {
            alert(error);
        })
    }

    const clickImgHandler = (target) => {
        closeFollowingAndFollowModal();
        if(nickname === target) {
            navigate("/mypage");
        } else {
            navigate(`/mypage/${target}`);
        }
    }

    const imgErrorHandler = (e) => {
        e.target.src = logo;
    }

    useEffect(() => {
        let nickname = window.localStorage.getItem("data");
        if(nickname == null) {
            nickname = JSON.parse(window.sessionStorage.getItem("data")).nick;
        } else {
            nickname = JSON.parse(window.localStorage.getItem("data")).nick;
        }
        setNickname(nickname);
        if(value === "follower") {
            followerListHandler();
            console.log(value);
        } else {
            followingListHandler();
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
                            {followMember.map((item, idx) =>
                                <div className="followmodallist">
                                   <img
                                       className="followmodalthumbnail-icon"
                                       alt=""
                                       src={`${bucket}/profile/${item.img}`}
                                       onError={imgErrorHandler} onClick={(e) => clickImgHandler(item.t)}
                                   />
                                   <div className="followmodalinfogroup">
                                       <div className="followmodalmembernicknametext">
                                           {item.t}
                                       </div>                                        
                                        <div className="followmodalmembercounttext">
                                           팔로우 {item.cnt}
                                       </div>
                                   </div>
                                   {
                                    nickname === item.t ? "" :
                                   <div className="followmodalbtngroup">
                                       <div className="followmodalbtnsection">
                                            <div className="followmodalfollowbtnframe">
                                                <div className="followmodalfollowbtnrectangle" />
                                                <button type={'button'} className="followmodalfollowbtntext" value={item.t} onClick={(e) => followToggleHandler(e.target.value)}>
                                                    {item.isfollow == 0 ? "팔로우" : "언팔로우"}</button>
                                            </div>
                                        </div>
                                    </div>
                                    }

                                </div>
                            )}
                     
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowingAndFollowerModal;