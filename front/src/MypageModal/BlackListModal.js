import React from 'react';
import backarrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import "./css/BlackList.css";
import {useRecoilState, useRecoilValue} from "recoil";
import {BlackMemberAtom} from "../recoil/FollowAtom";
import {BlackListModalOpen} from "../recoil/MypageModalAtom";
import axios from "axios";

function BlackListModal(props) {

    const bucket = process.env.REACT_APP_BUCKET_URL;

    const blackMember = useRecoilValue(BlackMemberAtom);
    const [isblackListModalOpen, setIsBlackListModalOpen] = useRecoilState(BlackListModalOpen);

    const closeBlackListModal = () => {
        setIsBlackListModalOpen(false);
    }

    const fValues = blackMember.map((item) => item.t);

    const handleBlackToggle = async (fValues) => {
        const url = "/api/lv2/b/blacktoggle";
        axios({
            method : 'post',
            url: url,
            params: {target: fValues}
        }).then(res=>{
            if(res.data === true){
                alert("dd");
            }else{
                console.log("else",res.data);
                alert("ss");
            }
        })
    }

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
                                                <div className="blacklistmodalblackbtnrectangl" />
                                                <button type={'button'} className="blacklistmodalblackbtntext"
                                                        onClick={()=> handleBlackToggle(item.t)}>블랙</button>
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