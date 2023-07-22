import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./css/sidebar.css";
import weplilogo from "./photo/weplilogo.png";
import home from "./svg/homeicon.svg";
import stage from "./svg/stageicon.svg";
import list from "./svg/musiclisticon.svg";
import logout from "./photo/logout.png";
import LoginModal from "../SideModal/LoginModal";
import FindIdModal from "../SideModal/FindIdModal";
import FindPassModal from "../SideModal/FindPassModal";
import SignUpModal from "../SideModal/SignUpModal";
import axios from "axios";
import PwChkModal from "../SideModal/PwChkModal";
import { useRecoilState } from 'recoil';
import { LoginStatusAtom } from '../recoil/LoginStatusAtom';
import {
    findIdModalOpenState,
    findIdSuccessModalOpenState,
    LoginModalOpen,
    pwChkModalOpen,
    FindPassModalOpen,
    SignUpModalOpen, FindPwChangeModalOpen
} from "../recoil/FindIdModalAtom";
import FindIdSuccessModal from "../SideModal/FindIdSuccessModal";

function SideBar(props) {

    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [signUpModalOpen, setSignUpModalOpen] = useRecoilState(SignUpModalOpen);
    const [profileImage, setProfileImage] = useState('');
    const [loginStatus,setLoginStatus] = useRecoilState(LoginStatusAtom);
    const [pwChkmodalOpen, setpwChkmodalOpen] = useRecoilState(pwChkModalOpen);
    const [findIdModalOpen, setFindIdModalOpen] = useRecoilState(findIdModalOpenState);
    const [loginmodalopen, setloginmodalopen] = useRecoilState(LoginModalOpen);
    const [findIdSuccessModalOpen,setfindIdSuccessModalOpen] =useRecoilState(findIdSuccessModalOpenState);
    const [findPassModalOpen, setFindPassModalOpen] = useRecoilState(FindPassModalOpen);
    const [findPwChangeModalOpen,setFindPwChangeModalOpen] = useRecoilState(FindPwChangeModalOpen);
    useEffect(()=>{
        console.log(loginStatus);
        try {
            setProfileImage(JSON.parse(localStorage.data || sessionStorage.data)?.img);
        } catch (error) {
            console.log(error);
        }
    },[loginStatus]);

    {/* 사이드 메뉴 이동 */}
    //로그인 모달 오픈
    const showModal = () => {
        setloginmodalopen(true);
    }

    //플레이리스트 이동
    const handleListClick = () => {
        //플레이리스트 이동
        navigate('/ranking')
    };

    // 메인페이지 이동
    const handleHomeClick = () => {
        navigate('/');
    };

    // 스테이지 이동
    const handleStageClick = () => {
        navigate('/stage');
    };
    {/* 끝 */}

    {/* 로그아웃 */}
    const onLogoutSubmit = () => {
        const url = '/api/lv1/m/logout';
        sessionStorage.removeItem('data');
        localStorage.removeItem('data');
        navigate(window.location.pathname);
        setLoginStatus(false);
        axios
            .post(url)
            .then(res => {
                // window.location.reload();
            })
            .catch(error => {
                if (error.response && error.response.status === 405) {
                    console.log('405 오류');

                } else {
                    console.log('오류:', error.message);
                }
            });
    };


    {/*
    로그인 했을때 -> 마이페이지
    로그인 안했을때 -> 로그인모달
    */}

    const handleProfileClick = () => {
        if (loginStatus) {
            setpwChkmodalOpen(true);
        } else {
            showModal();
        }
    };

    {/* 버밋 url */}
    const bucket = process.env.REACT_APP_BUCKET_URL;

    {/* 로고 default 이미지 */}
    const defaultprofile = weplilogo;

    return (
        <>
            <div className="sidemenu">
                <img className="weplilogo-icon" alt="" src={weplilogo} />
                <div className="sidemenubtns">
                    <div className="sidemenuhomebutton sidemnubtn" onClick={handleHomeClick}>
                        <img className="icon" alt="" src={home} />
                    </div>
                    <div className="sidemenuplaylistbutton sidemnubtn" onClick={handleListClick}>
                        <img className="icon" alt="" src={list} />
                    </div>
                    <div className="sidemenustagebutton sidemnubtn" onClick={handleStageClick}>
                        <img className="icon" alt="" src={stage} />
                    </div>
                </div>
                <div style={{position:'relative',width:'50px'}}>
                    <div className="sidemenumypagebutton sidemnubtn" onClick={handleProfileClick}>

                        <img
                            className="sidemenuuserimg-icon"
                            alt=""
                            src={loginStatus ? `${bucket}/profile/${profileImage}` : defaultprofile}
                        />
                    </div>
                    {/*{(sessionStorage.data !=null || localStorage.data !=null) && (*/}
                    {/*    <div className="sidemenulogoutbutton" onClick={onLogoutSubmit}>*/}
                    {/*        <img className='icon2' alt="" src={logout}/>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {
                        loginStatus ? <div className="sidemenulogoutbutton" onClick={onLogoutSubmit}>
                                    <img className='icon2' alt="" src={logout}/>
                              </div> : null
                    }
                </div>
            </div>
            {loginmodalopen && <LoginModal setloginmodalopen={setloginmodalopen} setFindIdModalOpen={setFindIdModalOpen}
                                      setFindPassModalOpen={setFindPassModalOpen} setSignUpModalOpen={setSignUpModalOpen}
                                      setpwChkmodalOpen={setpwChkmodalOpen} />}
            {findIdModalOpen && <FindIdModal setFindIdModalOpen={setFindIdModalOpen} setfindIdSuccessModalOpen={setfindIdSuccessModalOpen}/>}
            {findPassModalOpen && <FindPassModal setFindPassModalOpen={setFindPassModalOpen} setfindPwChangeModalOpen={findPwChangeModalOpen} />}
            {signUpModalOpen && <SignUpModal setSignUpModalOpen={setSignUpModalOpen} />}
            {pwChkmodalOpen && <PwChkModal setpwChkmodalOpen={setpwChkmodalOpen} />}
            {findIdSuccessModalOpen && <FindIdSuccessModal setfindIdSuccessModalOpen={setfindIdSuccessModalOpen}/> }

        </>

    );
}

export default SideBar;