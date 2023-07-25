import React, { useEffect, useState } from 'react';
import "./css/FollowListModal.css";
import backarrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {FollowMemberAtom} from "../recoil/FollowAtom";
import weplilogo from "./photo/weplieonlylogoonlylogo.png";

function FollowListModal({ setisFollowListModalOpen }) {

    const closeFollowListModal = async () => {
        await setisFollowListModalOpen(false);
    }

    const followMember = useRecoilValue(FollowMemberAtom);
    console.log("여기가 맵이야",followMember);
    const tValues = followMember.map((item) => item.t);
    console.log("t 값들", tValues);
    const data = sessionStorage.getItem("data") || localStorage.getItem("data");

    const storagedata = JSON.parse(data);
    const usernick = storagedata.nick;
    const useremail = storagedata.email;
    // const [imageLoadError, setImageLoadError] = useState(false);

    const bucket = process.env.REACT_APP_BUCKET_URL;
    const [followList, setFollowList] = useState(followMember);
    const handleFollow = async (tValues) => {
        // const url = "/api/lv2/b/addblacklist";
        const url = `/api/lv2/b/addblacklist?nick=${usernick}&target=${tValues}`;

        console.log("tValues:", tValues);
        axios
            .post(url,{nick:usernick,target:tValues})
            .then(res=>{
                if(res.data === true){

                    alert("dd");
                }else{
                    alert("ss");
                }
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
                                {
                                    followMember.map((item,idx) => (
                                <div className="followmodallist" key={idx}>
                                    <img
                                        className="followmodalthumbnail-icon"
                                        alt=""
                                        src={item.img ? `${bucket}/profile/${item.img}` : weplilogo}
                                        onError={(e) => (e.target.src = weplilogo)}
                                    />

                                    <div className="followmodalinfogroup">
                                        <div className="followmodalmembernicknametext">
                                            {item.t}
                                        </div>
                                        <div className="followmodalmembercounttext">
                                            팔로워 {item.cnt}
                                        </div>
                                    </div>
                                    <div className="followmodalbtngroup">
                                        <div className="followmodalbtnsection">
                                            <div className="followmodalblackbtnframe">
                                                <div className="followmodalblackbtnrectangle" />
                                                <button type={'button'} className="followmodalblackbtntext"
                                                        onClick={() => handleFollow(item.t)}>블랙</button>
                                            </div>
                                            <div className="followmodalfollowbtnframe">
                                                <div className="followmodalfollowbtnrectangle" />
                                                <button type={'button'} className="followmodalfollowbtntext">팔로우</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    );
}

export default FollowListModal;
