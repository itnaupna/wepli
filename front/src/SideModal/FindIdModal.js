import React from 'react';
import "./css/FindIdModal.css";
import arrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import btnarrow from "./svg/btnarrow.svg";

function FindIdModal({setFindIdModalOpen}) {
    const closeFindIdModal =  async() => {
        await setFindIdModalOpen(false);
    }

    return (
        <div>
            <div className="findidmodalframe" onClick={closeFindIdModal}></div>
            <div className="findidmodalgroup">
                <div className="findidmodalheader">
                    <div className="findmodaltitlegroup">
                        <div className="findmodaltitle">WEPLi</div>
                    </div>
                    <img
                        className="findidmodalarrowgroup-icon"
                        alt=""
                        src={arrow}
                    />
                    <img
                        className="findidmodalweplilogo-icon"
                        alt=""
                        src={logo}
                    />
                </div>
                <div className="findidinputemailgroup">
                    <input className="findidinputemail"
                           placeholder={'이메일을 입력해주세요'}></input>
                </div>
                <div className="findidemailbtngroup">
                    <div className="findidemailbtn"></div>
                    <div className="findidemailbtnsendtext">인증번호 전송</div>
                </div>
                <div className="findidinputemailgroup">
                    <input className="findidinputemail"
                           placeholder={'인증번호를 입력해주세요'}></input>
                </div>
                <div className="findidemailbtngroup">
                    <div className="findidemailbtn"/>
                    <div className="findidemailbtnsendtext">인증번호 확인</div>
                </div>
                <div
                    className="findidgofindpasstextgroup"
                >
                    <div className="findidgofindpasstext">
                        비밀번호가 생각나지 않으십니까?
                    </div>
                </div>
                <div className="findidmodalbottombtngroup">
                    <div className="findidmodalbottombtn">
                        <div className="findidmodalbottombtnrectangle"/>
                        <div className="findidmodalbottombtntext">아이디 찾기</div>
                    </div>
                    <img
                        className="findidmodalbottomarrow-icon"
                        alt=""
                        src={btnarrow}
                    />
                </div>
            </div>
        </div>
    );
}

export default FindIdModal;