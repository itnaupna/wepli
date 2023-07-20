import React from 'react';
import "./css/FindIdSuccessModal.css";
import arrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import btnarrow from "./svg/btnarrow.svg";
function FindIdSuccessModal({setFindIdSuccessModalOpen,recoveredEmail}) {

    const closeFindIdSuccessModal = () => {
        setFindIdSuccessModalOpen(false);
    }

    return (
        <div>
            <div className="findidsuccessmodalframe" onClick={closeFindIdSuccessModal}></div>
                <div className="findidsuccessmodalgroup">
                    <div className="findidsuccessmodalheader">
                        <div className="findidsuccessmodaltitlegroup">
                            <div className="findidsuccessmodaltitle">WEPLi</div>
                        </div>
                        <img
                            className="findidsuccessmodalarrowgroup-icon"
                            alt=""
                            src={arrow}
                        />
                        <img
                            className="findidsuccessmodalweplilogo-icon"
                            alt=""
                            src={logo}
                        />
                    </div>
                    <div className="findidsuccessmodaltextgroup">
                        {recoveredEmail ? `회원님의 아이디는 ${recoveredEmail}입니다.` : '아이디가 없어요'}
                    </div>
                    {/*<div className="findidsuccessmodalphoneinputgr">*/}
                    {/*    <input className="findidsuccessmodalphoneinput"></input>*/}
                    {/*</div>*/}
                    <div className="findidsuccessmodalbtngroup">
                        <div className="findidsuccessmypagebtn">
                            <div className="findidsuccessmodalbtnrectangle" />
                            <div className="findidsuccessmodalbtntext">확인</div>
                        </div>
                        <img
                            className="findidsuccessmodalbtnarrow-icon"
                            alt=""
                            src={btnarrow}
                        />
                    </div>
                </div>
        </div>
    );
}

export default FindIdSuccessModal;