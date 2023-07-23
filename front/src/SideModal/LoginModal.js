import React, { useEffect, useState } from 'react';
import "./css/loginmodal.css";
import kakao from "./photo/kakaobtn.png";
import naver from "./svg/naverlogin.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import arrow from "./svg/backarrow.svg";
import axios from "axios";
import {Await, useLocation, useNavigate} from "react-router-dom";
import { LoginStatusAtom } from '../recoil/LoginStatusAtom';
import {useRecoilState} from "recoil";
import {findIdModalOpenState, FindPassModalOpen, LoginModalOpen, SignUpModalOpen} from "../recoil/FindIdModalAtom";
import FindPassModal from "./FindPassModal";
import FindIdModal from "./FindIdModal";



function LoginModal() {

    const navi = useNavigate();
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [userData, setUserData] = useState(null);

    const [loginStatus,setLoginStatus] = useRecoilState(LoginStatusAtom);
    const [loginmodalopen, setloginmodalopen] = useRecoilState(LoginModalOpen);
    const [findIdModalOpen, setFindIdModalOpen] = useRecoilState(findIdModalOpenState);
    const [findPassModalOpen, setFindPassModalOpen] = useRecoilState(FindPassModalOpen);
    const [signUpModalOpen, setSignUpModalOpen] = useRecoilState(SignUpModalOpen);
    //로그인 모달 오픈
    const showFindIdModal = async () => {
        await setloginmodalopen(false);
        setFindIdModalOpen(true);
    };

    // 비밀번호찾기 모달 오픈
    const showFindPassModal = async () => {
        await setloginmodalopen(false);
        setFindPassModalOpen(true);
    };

    // 회원가입 모달 오픈
    const showSignUpModal = async () => {
        await setloginmodalopen(false);
        setSignUpModalOpen(true);
    };

    //로그인 모달 닫는 이벤트
    const closeModal = () => {
        setloginmodalopen(false);
    }

    const handleLogin = (e) => {
        const url = "/api/lv0/m/login";
        axios.post(
            url,
            { email, pw, autoLogin: isChecked },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then(res=>{
            if(res.data.result==="true"){
                setLoginStatus(true);
                console.log("로그인 시 ",setLoginStatus);
                let data = JSON.stringify(res.data.data)
                isChecked ? localStorage.setItem('data',data) : sessionStorage.setItem('data',data);
                setUserData(JSON.parse(data));
                navi(window.location.pathname);
                setloginmodalopen(false);
            }else if(res.data.result==="error"){
                alert('로그인에 실패하였습니다.');
            }
        }).catch(res=>{
            console.log("catch 구문",res);
            alert('아이디나 비밀번호를 확인해주세요.');
        })

    }

    // 라디오 체크 onchange
    const handleRadioChange = (e) => {
        setIsChecked(e.target.checked);
    };


    const handleInputEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleInputPw = (e) => {
        setPw(e.target.value);
    }


    const REDIRECT_URI = "http://localhost:3000/auth"
    const REST_API_KEY = "9d3f5e52469d4278fcbcbc2f8a944d2c"
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const location = useLocation();
    const params = new URL(document.location.toString()).searchParams;
    const code = new URL(window.location.href).searchParams.get("code");

    const PARAMS = new URL(document.location).searchParams

    // const KAKAO_CODE = PARAMS.get('code');


    const handlekakao = () => {
        window.location.href = KAKAO_AUTH_URL;
    }


    return (
        <div>
            <div className={'loginmodalmainframe'} onClick={closeModal}></div>
            <div className="loginmodalgroup">
                {/*자동로그인 체크*/}
                <div className="loginmodalautologinradiobox">
                    <input type={'radio'}
                        id="autologin"
                        name="autologin"
                        checked={isChecked}
                        onChange={handleRadioChange} />

                    <label htmlFor="autologin" className="loginmodalautologintext">자동로그인</label>
                    <div className="loginmodalradiogroup" />
                </div>
                <div className="loginmodalfindtextgroup">

                    {/*이메일 & 비밀번호 찾기*/}
                    <div className="loginmodalfindemailtext" onClick={showFindIdModal}>이메일찾기</div>
                    <div className="loginmodalfindpasstext" onClick={showFindPassModal}>비밀번호찾기</div>

                </div>
                <div className="loginmodalloginbtngroup">
                    {/*로그인 버튼*/}
                    <div className="loginmodalloginmodalbtn">
                        <div className="loginmodalbtngroup" />
                        <button type={'button'} className="loginmodalbtntext"
                            onClick={handleLogin}>로그인
                        </button>
                    </div>
                </div>
                <div className="gosignupbtn" onClick={showSignUpModal}>
                    <div className="loginmodalgosignupbtn">
                        <div className="loginmodalsignuptext">
                            <div className="loginmodalsignuptext-child"/>
                            <div className="loginmodalgosignupbtntext">회원가입</div>
                        </div>
                    </div>
                </div>
                <div className="loginmodalsnslogingroup">
                    <div className="loginmodalkakaologinimggroup">
                        <button type={'button'} className={'loginmodalkakaologinbtn'}
                            onClick={handlekakao}>
                            <img
                                className="kakaolgoinimg-icon"
                                alt=""
                                src={kakao}
                            />
                        </button>
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
                            <input type={'email'} className="loginmodalpassrectangle-child"
                                placeholder={'아이디를 입력해주세요'}
                                value={email} onChange={handleInputEmail}></input>
                        </div>
                    </div>
                </div>
                <div className="loginmodalpasslogininput">
                    <div className="loginmodalsignuptext">
                        <div className="loginmodalgosignupbtn">
                            <input type={'password'} className="loginmodalpassrectangle-child"
                                placeholder={'비밀번호를 입력해주세요'}
                                value={pw} onChange={handleInputPw}></input>
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