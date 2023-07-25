import React, {useEffect, useState} from 'react';
import "./css/InfoChangeModal.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import {DataState, emailConfirmState, UserStorageNick} from "../recoil/LoginStatusAtom";
import {useRecoilState, useRecoilValue} from "recoil";
import axios from "axios";
import {params} from "superagent/lib/utils";
import {json} from "react-router-dom";
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
    const emailconfirm = useRecoilValue(emailConfirmState);
    console.log("info change", emailconfirm);

    const data = sessionStorage.getItem("data") || localStorage.getItem("data");
    console.log("회원정보변경", data);

    const storagedata = JSON.parse(data);
    const usernick = storagedata.nick;
    const useremail = storagedata.email;
    console.log("파스",usernick);
    console.log("파스",useremail);

    const [prevEmail, setPrevEmail] = useState('');

    useEffect(() => {
        const data = sessionStorage.getItem('data') || localStorage.getItem('data');
        if (data) {
            const parsedData = JSON.parse(data);
            setPrevEmail(parsedData.email);
        }
    }, []);

    const handleinfoChnage = async () => {
        const url = "/api/lv1/m/info";
        axios({
            method: 'patch',
            url: url,
            data: { email: useremail, nick: usernick, newNick: nick, pw },
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (res.data.result) {

                const mypageurl = "/api/lv1/m/mypage";
                axios({
                    method: 'get',
                    url: mypageurl,
                    data: { userNick: nick },
                }).then(res => {
                    if (res.data) {
                        const storedData = JSON.parse(sessionStorage.getItem("data") || localStorage.getItem("data")) || {};
                        storedData.nick = res.data.nick;

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
                    alert('두 번째 요청에 실패하였습니다.');
                });
            } else {
                // 첫 번째 요청이 실패한 경우
                alert('이메일 인증이 필요합니다.');
            }
        }).catch(error => {
            // 첫 번째 요청 실패 시 처리
            console.error('첫 번째 요청 실패:', error);
            alert('정보변경에 실패하였습니다.');
        });

    }


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
                        emailconfirm === 1
                            ? '이미 이메일이 인증이되어 변경할 수 없습니다.'
                            : '이메일을 입력해주세요'
                    } className="mypageinfochangemodalnicknamei"
                    value={email} onChange={handleInputEmail} readOnly={emailconfirm === 1}></input>
                </div>

                {/*닉네임 입력*/}
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={'닉네임을 입력해주세요'} className="mypageinfochangemodalnicknamei"
                    value={nick} onChange={(e)=>setNickName(e.target.value)}></input>
                </div>

                {/*비밀번호 입력*/}
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={'비밀번호를 입력해주세요'} className="mypageinfochangemodalnicknamei"
                    value={pw} type={'password'} onChange={handleInputPw}></input>
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