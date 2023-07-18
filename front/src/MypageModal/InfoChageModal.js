import React from 'react';
import "./css/InfoChangeModal.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
function InfoChageModal({setIsInfoChangeModalOpen}) {

    const closeInfoChangeModal = async () => {
        await setIsInfoChangeModalOpen(false);
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
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={'닉네임을 입력해주세요'} className="mypageinfochangemodalnicknamei"></input>
                </div>
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={'이메일을 입력해주세요'} className="mypageinfochangemodalnicknamei"></input>
                </div>
                <div className="mypageinfochangemodalpassnickn">
                    <input placeholder={'비밀번호를 입력해주세요'} className="mypageinfochangemodalnicknamei"></input>
                </div>
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