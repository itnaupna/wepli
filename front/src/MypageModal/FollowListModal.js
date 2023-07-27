import React, { useEffect, useState } from 'react';
import "./css/FollowListModal.css";
import backarrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import axios from "axios";
import {useRecoilState, useRecoilValue} from "recoil";
import {BlackMemberAtom, FollowListAtom, FollowMemberAtom, TargetMemberAtom} from "../recoil/FollowAtom";
import weplilogo from "./photo/weplieonlylogoonlylogo.png";

function FollowListModal({ setisFollowListModalOpen  }) {

    const closeFollowListModal = async () => {
        await setisFollowListModalOpen(false);
    }


    const followMember = useRecoilValue(FollowMemberAtom);
    /*const [followMember, setFollowMember] = useRecoilState(FollowMemberAtom);*/
    const [followMember1, setFollowMember] = useRecoilState(FollowMemberAtom);

    const tValues = followMember.map((item) => item.t);
    console.log("t 값들", tValues);
    const data = sessionStorage.getItem("data") || localStorage.getItem("data");

    const storagedata = JSON.parse(data);
    const usernick = storagedata.nick;
    console.log("팔로우리스트",storagedata);
    const lstfollow = storagedata.lstfollow;
    console.log("팔로우 팔로우",lstfollow);


    const bucket = process.env.REACT_APP_BUCKET_URL;

    const blackMember = useRecoilValue(BlackMemberAtom);
    const [blackMember1, setBlackMember] = useRecoilState(BlackMemberAtom);

    const handleBlackToggle = async (fValues, idx) => {
        const url = "/api/lv2/b/blacktoggle";

        axios({
            method : 'post',
            url: url,
            params: {target: fValues}
        }).then(res=>{
            const updatedBlackMember = [...blackMember];
            updatedBlackMember[idx] = { ...updatedBlackMember[idx], isblack: res.data };
            setBlackMember(updatedBlackMember);

            const updatedFollowMember = [...followMember];
            updatedFollowMember[idx] = { ...updatedFollowMember[idx], isblack: res.data };
            setFollowMember(updatedFollowMember);
            console.log(res.data);
        }).catch(error => {
            alert(error);
        })
    }


    const targetMember= useRecoilValue(TargetMemberAtom);
    const [targetMember1, setTargetMember] = useRecoilState(TargetMemberAtom);

    const handleDeFollow = async (fValues, idx) => {
        const url = "/api/lv2/f/followtoggle";

        axios({
            method: 'post',
            url: url,
            params: { target: fValues }
        }).then(res => {
            const updatedUnFollow = [...targetMember];
            updatedUnFollow[idx] = { ...updatedUnFollow[idx], isfollow: res.data };
            setTargetMember(updatedUnFollow);

            const updatedFollowMember = [...followMember];
            updatedFollowMember[idx] = { ...updatedFollowMember[idx], isfollow: res.data };
            setFollowMember(updatedFollowMember);
        }).catch(error => {
            alert("에러");
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
                                    onClick={closeFollowListModal}
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
                                                <button type={'button'} className="followmodalblackbtntext" value={idx}
                                                        onClick={(e) => handleBlackToggle(item.t,e.target.value)}>
                                                    {item.isblack === 0 ? "취소" : "삭제"}
                                                </button>
                                            </div>
                                            <div className="followmodalfollowbtnframe">
                                                <div className="followmodalfollowbtnrectangle" />
                                                <button type={'button'} className="followmodalfollowbtntext" value={idx}
                                                onClick={(e)=> handleDeFollow(item.t,e.target.value)}>
                                                    {item.isfollow === 0 ? "팔로우" : "삭제"}
                                                </button>
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
