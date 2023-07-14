import React, {useState} from 'react';
import "./css/loginmodal.css";
import kakao from "./svg/kakaologin.svg";
import naver from "./svg/naverlogin.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import arrow from "./svg/backarrow.svg";
import axios from "axios";


function LoginModal({setModalOpen, setFindIdModalOpen, setFindPassModalOpen, setSignUpModalOpen}) {

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    //로그인 모달 오픈
    const showFindIdModal = async () => {
        await setModalOpen(false);
        setFindIdModalOpen(true);
    };

    // 비밀번호찾기 모달 오픈
    const showFindPassModal = async () => {
        await setModalOpen(false);
        setFindPassModalOpen(true);
    };

    // 회원가입 모달 오픈
    const showSignUpModal = async () => {
        await setModalOpen(false);
        setSignUpModalOpen(true);
    };

    //로그인 모달 닫는 이벤트
    const closeModal = () => {
        setModalOpen(false);
    }


    // 로그인버튼 클릭 이벤트
    const onLoginSubmit = (e) => {
        e.preventDefault();
        const url = "/api/lv0/m/login";

        axios.post(url, {email: email, pw: pw},
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

            .then(res => {
                const success = res.data.result;
                const dto = res.data.data;

                if(success==='true') {
                    console.log("성공",success);

                    const dtoList = [];
                    for (const key in dto){
                        dtoList.push(dto[key]);
                    }
                    sessionStorage.setItem('data',dtoList);

                    console.log(dtoList);
                } else {
                    // 실패
                    console.log("ㅇㅇ");
                    alert("로그인 실패");
                }
            })
            .catch(error => {
                console.log("에러에요", error);
                alert('아이디 비밀번호가 일치하지않습니다');
            });
    };

    // const onLogoutSubmit = (e) => {
    //     e.preventDefault();
    //     const url = "/lv1/m/logout";
    //     axios.post(url)
    //         .then(res => {
    //             const {success} = res.data;
    //             console.log(res.data);
    //             if (success) {
    //                 console.log("굿");
    //             } else {
    //                 // 실패
    //                 console.log("ㄷㄷ");
    //                 alert("ㅁㄹ");
    //             }
    //         })
    //         .catch(error => {
    //             console.log("에러에러에러에ㅓ레어레", error);
    //         });
    //     document.location.href = '/'
    // }

    const handleInputEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleInputPw = (e) => {
        setPw(e.target.value);
    }


    return (
        <div>
            <div className={'loginmodalmainframe'} onClick={closeModal}></div>
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
                        <button type={'button'} className="loginmodalbtntext"
                                onClick={onLoginSubmit}>로그인
                        </button>
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