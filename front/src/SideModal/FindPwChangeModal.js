import React, {useState} from 'react';
import arrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import btnarrow from "./svg/btnarrow.svg";
import "./css/FindPwChangeModal.css";
import axios from "axios";
function FindPwChangeModal({setFindPwChangeModalOpen,recoveredEmail,setFindPassModalOpen}) {

    const closeFindIdModal =  async() => {
        await setFindPassModalOpen(false);
        setFindPwChangeModalOpen(false);
    }

    const [newPw, setNewPw] = useState('');
    const [oldPw, setOldPw]=useState('');

    // pw
    const handleChangeNewPw = async () => {
        const url = "/api/lv1/m/pw";

        try {
            const res = await axios.patch(url, {newPw: newPw, oldPw: oldPw});
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
                        아이디 : {recoveredEmail}
                    </div>
                    <div className="findpwchangemodalphoneinputgro">
                        <input type={"password"} className="findpwchangemodalphoneinput" placeholder={'비밀번호를 입력해주세요'}
                        value={oldPw} onChange={(e)=>setNewPw(e.target.value)}></input>
                    </div>
                    <div className="findpwchangemodalphoneinputgro">
                        <input type={"password"} value={newPw} className="findpwchangemodalphoneinput"
                        onChange={(e)=>setOldPw(e.target.value)}></input>
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