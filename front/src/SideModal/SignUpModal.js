import React, {useState} from 'react';
import "./css/SignUpModal.css";
import arrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import btnarrow from "./svg/btnarrow.svg";
function SignUpModal({setSignUpModalOpen}) {

    const closeFindIdModal = () => {
        setSignUpModalOpen(false);
    }

    // const [nick, setNick] = useState("");
    // const [pw, setPw] = useState("");
    // const [email, setEmail] = useState("");
    return (
        <div>
            <div className="signupmodalframe" onClick={closeFindIdModal}></div>
            <div className="signupmodalgroup">
                <div className="signupmodalheader">
                    <div className="signupmodaltitlegroup">
                        <div className="signupmodaltitle">WEPLi</div>
                    </div>
                    <img
                        className="signupmodalarrowgroup-icon"
                        alt=""
                        src={arrow}
                    />
                    <img
                        className="signupmodalweplilogo-icon"
                        alt=""
                        src={logo}
                    />
                </div>
                <div className="signupcentertextgroup">
                    <div className="signupcentertext">회원가입</div>
                </div>
                <div className="signupinputemailgroup">
                    <input className="signupduplicationinputemail"
                    placeholder={'이메일을 입력해주세요'}></input>
                    <div className="signupemailbtngroup">
                        <div className="signuemailduplicationbtn"/>
                        <div className="signupemailbtnduplicationtext">중복확인</div>
                    </div>
                </div>
                <div className="signupinputemailgroup">
                    <input className="signupduplicationinputemail"
                    placeholder={'닉네임을 입력해주세요'}></input>
                    <div className="signupemailbtngroup">
                        <div className="signuemailduplicationbtn"/>
                        <div className="signupemailbtnduplicationtext">중복확인</div>
                    </div>
                </div>
                <div className="signupinputemailgroup">
                    <input className="signupduplicationinputemail"
                    placeholder={'비밀번호를 입력해주세요'}></input>
                </div>
                <div className="signupinputemailgroup">
                    <input className="signupduplicationinputemail"
                    placeholder={'비밀번호를 한번 더 입력해주세요'}/>
                </div>
                <div className="signupmodalbottombtngroup">
                    <div className="signupmodalbottombtn">
                        <div className="signupmodalbottombtnrectangle"/>
                        <div className="signupmodalbottombtntext">회원가입</div>
                    </div>
                    <img
                        className="signupmodalbottomarrow-icon"
                        alt=""
                        src={btnarrow}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignUpModal;