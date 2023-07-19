import React from 'react';
import "./css/OutMemberModal.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
function OutMemberModal({setIsOutMemberModalOpen}) {

    const closeOutMemberModal = async () => {
        await setIsOutMemberModalOpen(false);
    };

    return (
        <div>
            <div className="mypageoutmemebermodalframe" onClick={closeOutMemberModal}></div>
                <div className="mypageoutmemebermodalgroup">
                    <div className="mypageoutmemebermodalheader">
                        <div className="mypageoutmemebermodaltitlegrou">
                            <div className="mypageoutmemebermodaltitle">WEPLi</div>
                        </div>
                        <img
                            className="mypageoutmemebermodalarrowgrou-icon"
                            alt=""
                            src={backarrow}
                        />
                        <img
                            className="mypageoutmemebermodalweplilogo-icon"
                            alt=""
                            src={logo}
                        />
                    </div>
                    <div className="mypageoutmemebermodaltextgroup">
                        <div className="mypageoutmemebermodalcentertex">회원탈퇴</div>
                    </div>
                    <div className="mypageoutmemebermodalpassinput">
                        <input type={'password'} className="mypageoutmemebermodalpassinput1"></input>
                    </div>

                    <div className="mypageoutmemebermodalbtngroup">
                        <div className="mypageoutmemebermodalmypagebtn">
                            <div className="mypageoutmemebermodalbtnrectan" />
                            <button type={'button'} className="mypageoutmemebermodalbtntext">회원탈퇴</button>
                        </div>
                        <img
                            className="mypageoutmemebermodalbtnarrow-icon"
                            alt=""
                            src={btnarrow}
                        />
                    </div>
                </div>
        </div>
    );
}

export default OutMemberModal;