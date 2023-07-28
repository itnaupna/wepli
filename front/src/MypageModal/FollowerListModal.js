import React, {useEffect} from 'react';
import "./css/FollowerListModal.css";
import backarrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import {useRecoilState, useRecoilValue} from "recoil";
import {TargetListModalOpen} from "../recoil/MypageModalAtom";
import {TargetMemberAtom} from "../recoil/FollowAtom";
import axios from "axios";

function FollowerListModal(props) {
    const [isTargetListModalOpen, setisTargetListModalOpen] = useRecoilState(TargetListModalOpen);

    const closeTargetListModal = () => {
        setisTargetListModalOpen(false);
    }
    const bucket = process.env.REACT_APP_BUCKET_URL;

    const targetMember= useRecoilValue(TargetMemberAtom);
    const [targetMember1, setTargetMember] = useRecoilState(TargetMemberAtom);

    // const fValues = targetMember.map((item) => item.t);
    const fValues = targetMember.map((item) => item.t);

    const handleDeFollow = async (fValues, idx) => {
        const url = "/api/lv2/f/followtoggle";

        axios({
            method:'post',
            url: url,
            params: {target: fValues}
        }).then(res=>{
            const updatedUnFollow = [...targetMember];
            updatedUnFollow[idx] = {...updatedUnFollow[idx], isfollow: res.data};
            setTargetMember(updatedUnFollow);
        }).catch(error => {
            alert("에러");
        })
    }

    const handleUnFollow = async (fValues, idx) => {
        const url = "/api/lv2/f/delfollow";

        axios({
            method:'delete',
            url: url,
            params: {target: fValues}
        }).then(res=>{
            const updatedUnFollow = [...targetMember];
            updatedUnFollow[idx] = {...updatedUnFollow[idx], isfollow: res.data};
            setTargetMember(updatedUnFollow);
        })
    }


    return (
        <div>
            <div className="tagetlistmodalframe" onClick={closeTargetListModal}></div>
                <div className="followermodalwapper">
                    <div className="followermodalgroup">
                        <div className="followermodallayout">
                            <div className="followermodalheader">
                                <img
                                    className="followermodalmodalarrow-icon"
                                    alt=""
                                    src={backarrow}
                                />
                                <div className="followermodaltitle">
                                    <div className="followermodalwepli">WEPLi</div>
                                </div>
                                <img
                                    className="followermodalwplieonlylogo-5-icon"
                                    alt=""
                                    src={logo}
                                />
                            </div>
                            <div className="followermodalveticalframe">
                                {
                                    targetMember.map((item, idx) => (
                                <div className="followermodallist" key={idx}>
                                    <img
                                        className="followermodalthumbnail-icon"
                                        alt=""
                                        src={item.img ? `${bucket}/profile/${item.img}` : logo}
                                        onError={(e) => (e.target.src = logo)}
                                        referrerPolicy={'no-referrer'}
                                    />
                                    <div className="followermodalinfogroup">
                                        <div className="followermodalmembernicknametex">
                                            {item.t}
                                        </div>
                                        <div className="followermodalmembercounttext">
                                            팔로워 {item.cnt}
                                        </div>
                                    </div>
                                    <div className="followermodalbtngroup">
                                        <div className="followermodalbtnsection">

                                            <div className="followermodalfollowbtnframe">
                                                <div className="followermodalblackbtnrectangle" />
                                                <button type={'button'} className="followermodalfollowbtntext"
                                                        value={idx}
                                                onClick={(e)=> handleDeFollow(item.t, e.target.value)}>
                                                    {item.isfollow === 0 ? "추가" : "삭제"}</button>
                                            </div>
                                            <button type={'button'} value={idx} className={'followermodalunfollowbtn'}
                                                    onClick={(e)=> handleUnFollow(item.t,e.target.value)}>언팔로우</button>
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

export default FollowerListModal;