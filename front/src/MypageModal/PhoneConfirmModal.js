import React from 'react';
import "./css/PhoneConfirm.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
function PhoneConfirmModal({setisPhoneConfirmModalOpen}) {

    const closePhoneConfirmModal = async () => {
        await setisPhoneConfirmModalOpen(false);
    }

    return (
        <div>
            <div className="phoneconfirmmodalframe" onClick={closePhoneConfirmModal}></div>
                <div className="phoneconfirmmodalgroup">
                    <div className="phoneconfirmmodalheader">
                        <div className="phoneconfirmmodaltitlegroup">
                            <div className="phoneconfirmmodaltitle">WEPLi</div>
                        </div>
                        <img
                            className="phoneconfirmmodalarrowgroup-icon"
                            alt=""
                            src={backarrow}
                        />
                        <img
                            className="phoneconfirmmodalweplilogo-icon"
                            alt=""
                            src={logo}
                        />
                    </div>
                    <div className="phoneconfirmmodaltextgroup">
                        <div className="phoneconfirmmodalcentertext">전화번호 본인인증</div>
                    </div>
                    <div className="phoneconfirmmodalphoneinputgro">
                        <input type={'text'} className="phoneconfirmmodalphoneinput"></input>
                    </div>
                    <div className="phoneconfirmphonebtngroup">
                        <div className="phoneconfirmsendbtn" />
                        <div className="phoneconfirmphonebtntext">전송</div>
                    </div>
                    <div className="phoneconfirmmodalphoneinputgro">
                        <input type={'text'} className="phoneconfirmmodalphoneinput"></input>
                    </div>
                    <div className="phoneconfirmphonebtngroup">
                        <div className="phoneconfirmsendbtn" />
                        <div className="phoneconfirmphonebtntext">확인</div>
                    </div>
                    <div className="phoneconfirmmodalbtngroup">
                        <div className="phoneconfirmmypagebtn">
                            <div className="phoneconfirmmodalbtnrectangle" />
                            <button type={'button'} className="phoneconfirmmodalbtntext">본인인증</button>
                        </div>
                        <img
                            className="phoneconfirmmodalbtnarrow-icon"
                            alt=""
                            src={btnarrow}
                        />
                    </div>
                </div>
        </div>
    );
}

export default PhoneConfirmModal;