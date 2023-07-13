import React from 'react';
import arrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import btnarrow from "./svg/btnarrow.svg";
import "./css/FindPassModal.css";
function FindPassModal({setFindPassModalOpen}) {

    const closeFindPassModal = () => {
        setFindPassModalOpen(false);
    }
    return (
        <div>
            <div className="findpassmodalframe" onClick={closeFindPassModal}></div>
            <div className="findpassmodalgroup">
                <div className="findpassmodalheader">
                    <div className="findpassmodaltitlegroup">
                        <div className="findpassmodaltitle">WEPLi</div>
                    </div>
                    <img
                        className="findpassmodalarrowgroup-icon"
                        alt=""
                        src={arrow}
                    />
                    <img
                        className="findpassmodalweplilogo-icon"
                        alt=""
                        src={logo}
                    />
                </div>
                <div className="findpassinputemailgroup">
                    <input className="findpassinputemail" placeholder={'이메일을 입력해주세요'}></input>
                </div>
                <div className="findpassemailbtngroup">
                    <div className="findpassemailbtn"/>
                    <div className="findpassemailbtnsendtext">인증번호 전송</div>
                </div>
                <div className="findpassinputemailgroup">
                    <input className="findpassinputemail" placeholder={'인증번호를 입력해주세요'}></input>
                </div>
                <div className="findpassemailbtngroup">
                    <div className="findpassemailbtn"/>
                    <div className="findpassemailbtnsendtext">인증번호 확인</div>
                </div>
                <div
                    className="findpassgofindpasstextgroup"
                >
                    <div className="findpassgofindpasstext">
                        아이디가 생각나지 않으십니까?
                    </div>
                </div>
                <div className="findpassmodalbottombtngroup">
                    <div className="findpassmodalbottombtn">
                        <div className="findpassmodalbottombtnrectangl"/>
                        <div className="findpassmodalbottombtntext">비밀번호 찾기</div>
                    </div>
                    <img
                        className="findpassmodalbottomarrow-icon"
                        alt=""
                        src={btnarrow}
                    />
                </div>
            </div>
        </div>
    );
}

export default FindPassModal;