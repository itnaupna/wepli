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

    // const fValues = targetMember.map((item) => item.t);
    const fValues = targetMember.map((item) => item.t);
    console.log("ddd",fValues);
    const handleDeFollow = async (fValues) => {
        // const url = "/api/lv2/b/blacklist";
        // const url = `/api/lv2/f/delfollow?target=${fValues}`;
        const url = "/api/lv2/f/delfollow";

        console.log("tValues:", fValues);
        axios({
             method: "delete",
             url: url,
             params: {target : fValues}
            })
            .then(res=>{
                if(res.data === true){
                    alert("dd");
                }else{
                    console.log("dddd",res);
                    console.log("dddd",res.data);
                    alert("ss");
                }
            });
    }


    useEffect(()=>{

    },[]);

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
                                            {/*<div className="followermodalblackbtnframe">*/}
                                            {/*    <div className="followermodalblackbtnrectangle" />*/}
                                            {/*    <div className="followermodalblackbtntext">블랙</div>*/}
                                            {/*</div>*/}
                                            <div className="followermodalfollowbtnframe">
                                                <div className="followermodalblackbtnrectangle" />
                                                <button type={'button'} className="followermodalfollowbtntext"
                                                onClick={()=> handleDeFollow(item.t)}>언팔로우</button>
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

export default FollowerListModal;