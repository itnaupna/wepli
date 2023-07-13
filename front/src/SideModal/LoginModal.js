import React, {useState} from 'react';
import "./css/loginmodal.css";
import kakao from "./svg/kakaologin.svg";
import naver from "./svg/naverlogin.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import arrow from "./svg/backarrow.svg";

function LoginModal({setModalOpen,setFindIdModalOpen,setFindPassModalOpen,setSignUpModalOpen}) {


    //로그인 모달 오픈
    const showFindIdModal = async () => {
        await setModalOpen(false);
        setFindIdModalOpen(true);
    };

    const showFindPassModal = async () => {
        await setModalOpen(false);
        setFindPassModalOpen(true);
    };

    const showSignUpModal = async () => {
        await setModalOpen(false);
        setSignUpModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div>
            <div className={'loginmodalmainframe'} onClick={closeModal}>

            </div>
            <div className="loginmodalgroup">
                <div className="loginmodalautologinradiobox">
                    <div className="loginmodalautologintext">자동 로그인</div>
                    <div className="loginmodalradiogroup"/>
                </div>
                <div
                    className="loginmodalfindtextgroup"
                >
                    <div className="loginmodalfindemailtext" onClick={showFindIdModal}>이메일찾기</div>
                    <div className="loginmodalfindpasstext" onClick={showFindPassModal}>비밀번호찾기</div>
                </div>
                <div className="loginmodalloginbtngroup">
                    <div className="loginmodalloginmodalbtn">
                        <div className="loginmodalbtngroup"/>
                        <div className="loginmodalbtntext">로그인</div>
                    </div>
                </div>
                <div className="gosignupbtn" onClick={showSignUpModal}>
                    <div className="loginmodalgosignupbtn">
                        <div className="loginmodalsignuptext">
                            <div className="loginmodalsignuptext-child"/>
                            <div className="div">회원가입</div>
                        </div>
                    </div>
                </div>
                <div className="loginmodalsnslogingroup">
                    <div className="loginmodalkakaologinimggroup">
                        <img
                            className="kakaolgoinimg-icon"
                            alt=""
                            src={kakao}
                        />
                    </div>
                    <div className="loginmodalnaverloginimggroup">
                        <img
                            className="naverloginimg-icon"
                            alt=""
                            src={naver}
                        />
                    </div>
                </div>
                <div className="loginmodalmiddletextgroup">
                    <div className="rectangleortextgroup">
                        <div className="loginmodalfindemailtext">또는</div>
                    </div>
                </div>
                <div className="loginmodalidlogininputgroup">
                    <div className="loginmodalsignuptext">
                        <div className="loginmodalgosignupbtn">
                            <input className="loginmodalpassrectangle-child"
                                   placeholder={'아이디를 입력해주세요'}></input>
                        </div>
                    </div>
                </div>
                <div className="loginmodalpasslogininput">
                    <div className="loginmodalsignuptext">
                        <div className="loginmodalgosignupbtn">
                            <input type={'password'} className="loginmodalpassrectangle-child"
                                   placeholder={'비밀번호를 입력해주세요'}></input>
                        </div>
                    </div>
                </div>
                <div className="loginmodalheader">
                    <div className="loginmodaltitlegorup">
                        <div className="loginmodalfindemailtext">WEPLi</div>
                    </div>
                    <img
                        className="loginmodalweplilogo-icon"
                        alt=""
                        src={logo}
                    />
                    <img
                        className="loginbackarrowicongroup"
                        alt=""
                        src={arrow}
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginModal;