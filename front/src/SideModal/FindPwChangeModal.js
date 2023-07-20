import React, {useState} from 'react';
import arrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import btnarrow from "./svg/btnarrow.svg";
import "./css/FindPwChangeModal.css";
import axios from "axios";
function FindPwChangeModal({setFindPwChangeModalOpen,recoveredEmail}) {

    const closeFindIdModal =  async() => {
        await setFindPwChangeModalOpen(false);
    }

    const [newPw, setNewPw] = useState('');
    const [verifyType, setVerifyType] = useState(0);
    const [verifyKey, setVerifyKey] = useState('');
    const [resultVerify, setResultVerify] = useState(false);

    const handleChangeNewPw = async () => {
        const url = "/api/lv0/m/findPw";

        try {
            const res = await axios.post(url, {type: verifyType, key: verifyKey, email: recoveredEmail, newPw: newPw, phone:recoveredEmail});
            if(res.data){
                alert('비밀번호 변경 성공!');
            }else{
                console.log(res.data);
                console.log(res);
                alert("dd");
            }

        } catch(error) {
            alert('비밀번호 변경 실패');
        }
    };

    console.log(recoveredEmail);
    return (
        <div>
            <div className="findpwchangemodalframe" onClick={closeFindIdModal}></div>
                <div className="findpwchangemodalgroup">
                    <div className="findpwchangemodalheader">
                        <div className="findpwchangemodaltitlegroup">
                            <div className="findpwchangemodaltitle">WEPLi</div>

                        </div>
                        <img
                            className="findpwchangemodalarrowgroup-icon"
                            alt=""
                            src={arrow}
                        />
                        <img
                            className="findpwchangemodalweplilogo-icon"
                            alt=""
                            src={logo}
                        />
                    </div>
                    <div className="findpwchangemodaltextgroup">
                        {recoveredEmail}ㅇㅇㅇ
                        <div className="findpwchangemodalcentertext">비밀번호 변경</div>
                    </div>
                    <div className="findpwchangemodalphoneinputgro">
                        <input type={"password"} className="findpwchangemodalphoneinput" placeholder={'비밀번호를 입력해주세요'}
                        value={newPw} onChange={(e)=>setNewPw(e.target.value)}></input>
                    </div>
                    <div className="findpwchangemodalphoneinputgro">
                        <div className="findpwchangemodalphoneinput" />
                    </div>
                    <div className="findpwchangemodalchangetext">{`비밀번호가 일치하지 않을때 `}</div>
                    <div className="findpwchangemodalbtngroup">

                        <div className="findpwchangemypagebtn">
                            <div className="findpwchangemodalbtnrectangle" />
                            <button type={'button'} onClick={handleChangeNewPw} className="findpwchangemodalbtntext">확인</button>
                        </div>
                        <img
                            className="findpwchangemodalbtnarrow-icon"
                            alt=""
                            src={btnarrow}
                        />

                    </div>

                </div>
        </div>
    );
}

export default FindPwChangeModal;