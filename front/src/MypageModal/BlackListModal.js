import React, {useEffect, useState} from 'react';
import backarrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import "./css/BlackList.css";
import {useRecoilState, useRecoilValue} from "recoil";
import {BlackMemberAtom} from "../recoil/FollowAtom";
import {BlackListModalOpen} from "../recoil/MypageModalAtom";
import axios from "axios";
import {DataState} from "../recoil/LoginStatusAtom";

function BlackListModal({target}) {

    const bucket = process.env.REACT_APP_BUCKET_URL;

    const blackMember = useRecoilValue(BlackMemberAtom);
    const [isblackListModalOpen, setIsBlackListModalOpen] = useRecoilState(BlackListModalOpen);
    const dataState = useRecoilValue(DataState);
    const userNick = dataState.nick;



    const closeBlackListModal = () => {
        setIsBlackListModalOpen(false);
    }

    const fValues = blackMember.map((item) => item.t);

    const [data, setData] = useState({nick: "", img: "", desc: "", followCnt: 0, followerCnt: 0, followChk: 0, blackChk: 0});
    const handleBlackToggle = async (fValues) => {
        const url = "/api/lv2/b/blacktoggle";
        axios({
            method : 'post',
            url: url,
            params: {target: fValues}
        }).then(res=>{
            setData({...data, blackChk: res.data, followChk: 0});
            console.log(res.data);
        }).catch(error => {
            alert(error);
        })
    }

    const hadlememberPage = () => {
        axios({
            method: "get",
            url: "/api/lv0/m/mypage",
            params: {userNick : userNick}
        }).then(res => {
            setData(res.data);
        }).catch(error => {
            alert(error);
        })

    }
    useEffect(() => {
        hadlememberPage();
    }, [data.blackChk,userNick]);

    return (
        <div>
            <div className="blacklistmodalframe" onClick={closeBlackListModal}></div>
                <div className="blacklistmodalwapper">
                    <div className="blacklistmodalgroup">
                        <div className="blacklistmodallayout">
                            <div className="blacklistmodalheader">
                                <img
                                    className="blacklistmodalmodalarrow-icon"
                                    alt=""
                                    src={backarrow}
                                />
                                <div className="blacklistmodaltitle">
                                    <div className="blacklistmodalwepli">WEPLi</div>
                                </div>
                                <img
                                    className="blacklistmodalwplieonlylogo-5-icon"
                                    alt=""
                                    src={logo}
                                />
                            </div>
                            <div className="blacklistmodalveticalframe">
                                {
                                    blackMember.map((item,idx)=> (
                                <div className="blacklistmodallist" key={idx}>
                                    <img
                                        className="blacklistmodalthumbnail-icon"
                                        alt=""
                                        src={item.img ? `${bucket}/profile/${item.img}` : logo}
                                        onError={(e) => (e.target.src = logo)}
                                    />

                                    <div className="blacklistmodalinfogroup">
                                        <div className="blacklistmodalmembernicknamete">
                                            {item.t}
                                        </div>
                                        <div className="blacklistmodalmembercounttext">
                                            팔로워 {item.cnt}
                                        </div>
                                    </div>
                                    <div className="blacklistmodalbtngroup">
                                        <div className="blacklistmodalbtnsection">
                                            <div className="blacklistmodalblackbtnframe">
                                                <div className="blacklistmodalblackbtnrectangl"/>
                                                <button type={'button'} className="blacklistmodalblackbtntext"
                                                        onClick={()=> handleBlackToggle(item.t)}>
                                                    {data.blackChk === 0 ? "추가" : "삭제"}</button>
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

export default BlackListModal;