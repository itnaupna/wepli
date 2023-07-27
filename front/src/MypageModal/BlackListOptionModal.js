import React from 'react';
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import "./css/BlackListOption.css";
import {useRecoilState} from "recoil";
import {BlackListModalOpen, BlackListOptionModalOpen} from "../recoil/MypageModalAtom";

function BlackListOptionModal() {

    const [isBlackListModalOpen, setisBlackListModalOpen] = useRecoilState(BlackListModalOpen);

    const closeBlackListOptionModal = async () => {
        await setisBlackListModalOpen(false);
    }
    return (
        <div>
            <div className="blacklistoptionmodalframe" onClick={closeBlackListOptionModal}></div>
            <div className="blacklistoptionmodalgroup">
                <div className="blacklistoptionmodalheader">
                    <div className="blacklistoptionmodaltitlegroup">
                        <div className="blacklistoptionmodaltitle">WEPLi</div>
                    </div>
                    <img
                        className="blacklistoptionmodalarrowgroup-icon"
                        alt=""
                        src={backarrow}
                    />
                    <img
                        className="blacklistoptionmodalweplilogo-icon"
                        alt=""
                        src={logo}
                    />
                </div>
                <div className="blacklistoptioncentertextgroup">
                    <div className="blacklistoptioncentertext">블랙리스트 옵션</div>
                </div>
                <div className="blacklistoptionchatcheckgroup">
                    <div className="blacklistoptionchatchecksectio"/>
                    <div className="blacklistoptionchatcheckbox"/>
                    <div className="blacklistoptionchatchecktext">채팅 표시 여부</div>
                </div>
                <div className="blacklistoptionchatcheckgroup">
                    <div className="blacklistoptionchatchecksectio"/>
                    <div className="blacklistoptionmutecheckbox"/>
                    <div className="blacklistoptionmutecheckttext">음소거 처리</div>
                </div>
                <div>
                    <input type={'checkbox'}>채팅 표시 여부</input>
                </div>
                <input type={'checkbox'}>음소거 처리</input>
                <div className="blacklistoptionmodalbtngroup">
                    <div className="blacklistoptionmodalmodalbtn">
                        <div className="blacklistoptionmodalmodalbtnre"/>
                        <button type={'button'} className="blacklistoptionmodalmodalbtnte">옵션설정</button>
                    </div>
                    <img
                        className="blacklistoptionmodalmodalarrow-icon"
                        alt=""
                        src={btnarrow}
                    />
                </div>
            </div>
        </div>
    );
}

export default BlackListOptionModal;