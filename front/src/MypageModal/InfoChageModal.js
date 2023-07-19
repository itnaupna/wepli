import React, {useState} from 'react';
import "./css/InfoChangeModal.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
function InfoChageModal({setIsInfoChangeModalOpen}) {

    const [nick, setNickName] = useState();
    const [email, setEmail]= useState();
    const [pw, setPw]=useState();

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
    console.log("회원정보변경",data);
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
                    <input placeholder={'이메일을 입력해주세요'} className="mypageinfochangemodalnicknamei"
                    value={email} onChange={handleInputEmail}></input>
                </div>

                {/*닉네임 입력*/}
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={'닉네임을 입력해주세요'} className="mypageinfochangemodalnicknamei"
                    value={nick} onChange={handleInputNick}></input>
                </div>

                {/*비밀번호 입력*/}
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={'비밀번호를 입력해주세요'} className="mypageinfochangemodalnicknamei"
                    value={pw} onChange={handleInputPw}></input>
                </div>

                {/*정보수정 버튼*/}
                <div className="mypageinfochangemodalbtngroup">
                    <div className="mypageinfochangemodalmypagebtn">
                        <div className="mypageinfochangemodalbtnrectan"/>
                        <button type={'button'} className="mypageinfochangemodalbtntext">회원정보수정</button>
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