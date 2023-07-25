import React, { useEffect, useState } from 'react';
import "./css/FollowListModal.css";
import backarrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import axios from "axios";
import {useRecoilState, useRecoilValue} from "recoil";
import {FollowListAtom, FollowMemberAtom} from "../recoil/FollowAtom";
import weplilogo from "./photo/weplieonlylogoonlylogo.png";

function FollowListModal({ setisFollowListModalOpen  }) {

    const closeFollowListModal = async () => {
        await setisFollowListModalOpen(false);
    }


    const followMember = useRecoilValue(FollowMemberAtom);
    /*const [followMember, setFollowMember] = useRecoilState(FollowMemberAtom);*/
    const [followList, setFollowList] = useRecoilState(FollowListAtom);

    const tValues = followMember.map((item) => item.t);
    console.log("t 값들", tValues);
    const data = sessionStorage.getItem("data") || localStorage.getItem("data");

    const storagedata = JSON.parse(data);
    const usernick = storagedata.nick;
    console.log("팔로우리스트",storagedata);
    const lstfollow = storagedata.lstfollow;
    console.log("팔로우 팔로우",lstfollow);


    const bucket = process.env.REACT_APP_BUCKET_URL;
    const handleBlack = async (tValues) => {
        // const url = "/api/lv2/b/blacklist";
        const url = `/api/lv2/b/addblacklist?target=${tValues}`;

        console.log("tValues:", tValues);
        axios
            .post(url)
            .then(res=>{
                if(res.data === true){
                    alert("dd");
                }else{
                    alert("ss");
                }
            });
    }

    const handleUnFollow = (tValue) => {
        const url = `/api/lv2/f/unfollow?target=${tValue}`;

        axios({
            method: 'delete',
            url: url
        }).then(res=>{
            console.log("then res" + res);
            const mypageurl = "/api/lv0/m/mypage";
            axios({
                method: "get",
                url: mypageurl,
                data: { userNick: usernick },
            }).then(res => {
                alert("언팔로우");
                if (res.data) {
                    console.log("if data", res.data);
                    // const storedData = JSON.parse(sessionStorage.getItem("data") || localStorage.getItem("data")) || {};
                    // storedData.lstfollow = res.data.lstfollow;
                    //
                    // const newData = JSON.stringify(storedData);
                    // console.log("이미지" + newData);
                    // sessionStorage.setItem("data", newData);
                    //
                    // setFollowList(res.data.lstfollow);
                    alert("언팔로우 후 데이터 값 넣기");
                } else {
                    alert("꽝");
                }
            });
        })
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
                                                        onClick={() => handleBlack(item.t)}>블랙</button>
                                            </div>
                                            <div className="followmodalfollowbtnframe">
                                                <div className="followmodalfollowbtnrectangle" />
                                                <button type={'button'} className="followmodalfollowbtntext"
                                                onClick={()=> handleUnFollow(item.t)}>팔로우</button>
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
