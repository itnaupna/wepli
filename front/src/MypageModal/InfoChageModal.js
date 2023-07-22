import React, {useEffect, useState} from 'react';
import "./css/InfoChangeModal.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import {emailConfirmState} from "../recoil/LoginStatusAtom";
import {useRecoilValue} from "recoil";
import axios from "axios";
import {params} from "superagent/lib/utils";
function InfoChageModal({setIsInfoChangeModalOpen}) {

    const [nick, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

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

    const [prevEmail, setPrevEmail] = useState('');

    useEffect(() => {
        const data = sessionStorage.getItem('data') || localStorage.getItem('data');
        if (data) {
            const parsedData = JSON.parse(data);
            setPrevEmail(parsedData.email);
        }
    }, []);

    const handleinfoChnage = async () => {
        const url = '/api/lv1/m/info';
        try {
            const emailToSend = email || prevEmail;
            const response = await axios.patch(url, {email: emailToSend, nick, pw});
            console.log(response.data.result);
            console.log('나와라 얍', response.data.result);

            if (response.data.result) {
                alert('정보가 성공적으로 수정되었습니다.');
            } else {
                console.log("else",response.data.result);
                alert('이메일 인증이 필요합니다.');
            }

            // Modal 닫기
            setIsInfoChangeModalOpen(false);
        } catch (error) {
            // 서버 요청 실패시 처리
            console.error('정보변경 실패:', error);

            alert('정보변경에 실패하였습니다.');
        }
    }



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
                    value={nick} onChange={handleInputNick}></input>
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