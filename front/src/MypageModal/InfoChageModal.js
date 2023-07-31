import React, {useEffect, useState} from 'react';
import "./css/InfoChangeModal.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import {UserStorageNick} from "../recoil/LoginStatusAtom";
import {useRecoilState, useRecoilValue} from "recoil";
import axios from "axios";
function InfoChageModal({setIsInfoChangeModalOpen}) {

    const [nick, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [userStorageNick, setUserStorageNick] = useRecoilState(UserStorageNick);


    const closeInfoChangeModal = async () => {
        await setIsInfoChangeModalOpen(false);
    }

    const handleInputNick = (e) => {
        setNickName(e.target.value);
    }

    const handleInputEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleInputPw = (e) => {
        setPw(e.target.value);
    }

    const data = sessionStorage.getItem("data") || localStorage.getItem("data");

    const storagedata = JSON.parse(data);
    const usernick = storagedata.nick;
    const useremail = storagedata.email;
    const emailconfirm = storagedata.emailconfirm;
    const [prevEmail, setPrevEmail] = useState('');

    useEffect(() => {
        const data = sessionStorage.getItem('data') || localStorage.getItem('data');
        if (data) {
            const parsedData = JSON.parse(data);
            setPrevEmail(parsedData.email);
        }
    }, [prevEmail]);

    const handleinfoChnage = async () => {
        const emailRegex = new RegExp("^[a-zA-Z0-9._+-,]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

        if (nick.length > 10) {
            alert("닉네임은 최대 10글자까지 입력할 수 있습니다.");
            return;
        }

        if (!pw) {
            alert("회원정보를 입력해주세요");
            return;
        }

        if (emailconfirm === 1) {
            // emailconfirm이 1일 경우, 세션에 저장된 이메일 값을 사용
            setEmail(useremail);
        } else {
            // emailconfirm이 0일 경우, 입력된 이메일 값 검증 후, 올바른 형식의 이메일인지 확인
            if (!email) {
                alert("이메일을 입력해주세요");
                return;
            } else if (!emailRegex.test(email)) {
                alert("유효한 이메일 주소를 입력해주세요");
                return;
            }
        }

        const url = "/api/lv1/m/info";
        axios({
            method: 'patch',
            url: url,
            data: { email: email, newNick: nick, pw : pw },
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (res.data) {
                const mypageurl = "/api/lv0/m/mypage";
                axios({
                    method: 'get',
                    url: mypageurl,
                    data: { userNick: nick },
                }).then(res => {
                    if (res.data) {
                        const storedData = JSON.parse(sessionStorage.getItem("data") || localStorage.getItem("data")) || {};
                        storedData.nick = res.data.nick;
                        storedData.email = res.data.email;

                        const newData = JSON.stringify(storedData);
                        console.log("이미지" + newData);
                        sessionStorage.setItem("data", newData);
                        setUserStorageNick(res.data.nick);
                        setIsInfoChangeModalOpen(false);
                        alert('정보가 성공적으로 수정되었습니다.');
                    }
                }).catch(error => {
                    // 두 번째 요청 실패 시 처리
                    console.error('두 번째 요청 실패:', error);
                    alert('인포안됨');
                });
            } else {
                // 첫 번째 요청이 실패한 경우
                alert('이메일 인증이 필요합니다.');
            }
        }).catch(error => {
            // 첫 번째 요청 실패 시 처리
            console.error('첫 번째 요청 실패:', error);
            alert('이미 사용중입니다.');
        });
    }

    const InfoChangeEnter = (e) =>{
        if (e.key === 'Enter') {
            handleinfoChnage();
        }
    };

    useEffect(()=>{
        setUserStorageNick(userStorageNick);
    },[userStorageNick]);
    return (
        <div>
            <div className="mypageinfochangemodalframe" onClick={closeInfoChangeModal}></div>
            <div className="mypageinfochangemodalgroup">
                <div className="mypageoutmemebermodalheader">
                    <div className="mypageinfochangemodaltitlegrou">
                        <div className="mypageinfochangemodaltitle">WEPLi</div>
                    </div>
                    <img
                        className="mypageinfochangemodalarrowgrou-icon"
                        alt=""
                        src={backarrow}
                        onClick={closeInfoChangeModal}
                    />
                    <img
                        className="mypageinfochangemodalweplilogo-icon"
                        alt=""
                        src={logo}
                    />
                </div>
                <div className="mypageinfochangermodaltextgrou">
                    <div className="mypageinfochangemodalcentertex">회원정보수정</div>
                </div>

                {/*이메일 입력*/}
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={
                        emailconfirm != 1
                            ? '이메일을 입력해주세요'
                            : '이미 이메일이 인증이되어 변경할 수 없습니다.'
                    } className="mypageinfochangemodalnicknamei"
                           value={email} onChange={handleInputEmail} onKeyPress={InfoChangeEnter} readOnly={emailconfirm === 1}></input>
                </div>

                {/*닉네임 입력*/}
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={'닉네임을 입력해주세요'} className="mypageinfochangemodalnicknamei"
                           value={nick} onChange={(e)=>setNickName(e.target.value)} onKeyPress={InfoChangeEnter}></input>
                </div>

                {/*비밀번호 입력*/}
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={'비밀번호를 입력해주세요'} className="mypageinfochangemodalnicknamei"
                           value={pw} type={'password'} onChange={handleInputPw} onKeyPress={InfoChangeEnter}></input>
                </div>

                {/*정보수정 버튼*/}
                <div className="mypageinfochangemodalbtngroup">
                    <div className="mypageinfochangemodalmypagebtn">
                        <div className="mypageinfochangemodalbtnrectan"/>
                        <button type={'button'} className="mypageinfochangemodalbtntext"
                                onClick={handleinfoChnage}>회원정보수정</button>
                    </div>
                    <img
                        className="mypageinfochangemodalbtnarrow-icon"
                        alt=""
                        src={btnarrow}
                    />
                </div>
            </div>
        </div>
    );

}

export default InfoChageModal;