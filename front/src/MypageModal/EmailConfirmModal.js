import React from 'react';
import "./css/EmailConfirm.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
function EmailConfirmModal({setisEmailConfirmModalOpen}) {

    const closeEmailConfirmModal = async () => {
        await setisEmailConfirmModalOpen(false);
    }

    return (
        <div>
            <div className="emailconfirmmodalframe" onClick={closeEmailConfirmModal}></div>
                <div className="emailconfirmmodalgroup">
                    <div className="emailconfirmmodalheader">
                        <div className="emailconfirmmodaltitlegroup">
                            <div className="emailconfirmmodaltitle">WEPLi</div>
                        </div>
                        <img
                            className="emailconfirmmodalarrowgroup-icon"
                            alt=""
                            src={backarrow}
                        />
                        <img
                            className="emailconfirmmodalweplilogo-icon"
                            alt=""
                            src={logo}
                        />
                    </div>
                    <div className="emailconfirmmodaltextgroup">
                        <div className="emailconfirmmodalcentertext">이메일 본인인증</div>
                    </div>
                    <div className="emailconfirmmodalemailinputgro">
                        <input type={'email'} className="emailconfirmmodalemailinput"></input>
                    </div>
                    <div className="emailconfirmemailbtngroup">
                        <div className="emailconfirmsendbtn" />
                        <div className="emailconfirmemailbtntext">전송</div>
                    </div>
                    <div className="emailconfirmmodalemailinputgro">
                        <input type={'text'} className="emailconfirmmodalemailinput"></input>
                    </div>
                    <div className="emailconfirmemailbtngroup">
                        <div className="emailconfirmsendbtn" />
                        <div className="emailconfirmemailbtntext">확인</div>
                    </div>
                    <div className="emailconfirmmodalbtngroup">
                        <div className="emailconfirmmypagebtn">
                            <div className="emailconfirmmodalbtnrectangle" />
                            <div className="emailconfirmmodalbtntext">본인인증</div>
                        </div>
                        <img
                            className="emailconfirmmodalbtnarrow-icon"
                            alt=""
                            src={btnarrow}
                        />
                    </div>
                </div>
        </div>
    );

}

export default EmailConfirmModal;