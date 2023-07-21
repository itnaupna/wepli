import React, {useState} from 'react';
import arrow from "./svg/backarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import btnarrow from "./svg/btnarrow.svg";
import "./css/FindPassModal.css";
import axios from "axios";
import FindPwChangeModal from "./FindPwChangeModal";
function FindPassModal({setFindPassModalOpen,setFindPwChangeModalOpen}) {

    const closeFindPassModal = () => {
        setFindPassModalOpen(false);
    }
    // const [FindPwChangeModalOpen, setFindPwChangeModalOpen]= useState(false);
    const [verifyKey, setVerifyKey] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [verifyType, setVerifyType] = useState(0);
    const [resultRV, setResultRV] = useState(false);
    const [resultVerify, setResultVerify] = useState(false);
    const [recoveredEmail, setRecoveredEmail] = useState(null);

    const showPwChangeModal =  async () => {
        setFindPwChangeModalOpen(true);
        // setFindPassModalOpen(false);
    }
    const handleRequestCodeFind = async () => {
        const url = "/api/lv0/m/requestcode";

        try {
            const res = await axios.post(url, { type: verifyType, key: verifyKey, phone: verifyKey,email: verifyKey });
            console.log(res);
            if (res.data === true) {
                setResultRV(res.data);

                alert("인증 성공");
            } else {
                console.log(res.data);
                console.log(res);
                alert("실패");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 405) {
                    console.log(error.response);
                    alert("405");
                } else {
                    alert(error.response.data);
                }
            } else {
                alert(error.message);
            }
        }
    };

    const handleVerifyCodeFind = async () => {
        const url = "/api/lv0/m/verifycodefind";
        try {
            const res = await axios.post(url, { type: verifyType, key: verifyKey, code: verifyCode, authType: "findPw" });
            console.log("인증번호", res);
            if (res.data) {
                console.log(res.data);
                setRecoveredEmail(res.data);
            } else {
                setRecoveredEmail(null);
                // 실패 시 특별한 처리를 하지 않습니다.
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <div className="findpassmodalframe" onClick={closeFindPassModal}></div>
            <div className="findpassmodalgroup">
                <div className="findpassmodalheader">
                    <div className="findpassmodaltitlegroup">
                        <div className="findpassmodaltitle">WEPLi</div>
                    </div>
                    <img
                        className="findpassmodalarrowgroup-icon"
                        alt=""
                        src={arrow}
                    />
                    <img
                        className="findpassmodalweplilogo-icon"
                        alt=""
                        src={logo}
                    />
                </div>
                <select defaultValue={verifyType} onChange={(e) => setVerifyType(e.target.selectedIndex.toString())}>
                    <option>이메일</option>
                    <option>문자</option>
                </select>
                <br/>
                <div className="findpassinputemailgroup">
                    <input className="findpassinputemail" placeholder={'이메일을 입력해주세요'} value={verifyKey}
                    onChange={(e)=>setVerifyKey(e.target.value)}></input>
                </div>
                <div className="findpassemailbtngroup">
                    <div className="findpassemailbtn"/>
                    <button type={'button'} className="findpassemailbtnsendtext" onClick={handleRequestCodeFind}>인증번호 전송</button>
                </div>
                <div className="findpassinputemailgroup">
                    <input className="findpassinputcode" placeholder={'인증번호를 입력해주세요'} value={verifyCode}
                    onChange={(e)=>setVerifyCode(e.target.value)}></input>
                </div>

                <div className="findpassgofindpasstextgroup">
                    <div className="findpassgofindpasstext">
                        아이디가 생각나지 않으십니까?
                    </div>
                </div>
                <div className="findpassmodalbottombtngroup">
                    <div className="findpassmodalbottombtn">
                        <div className="findpassmodalbottombtnrectangle"/>
                        <button type={'button'} className="findpassemailbtnsendtext" onClick={handleVerifyCodeFind}>인증번호 확인</button>
                    </div>
                    <img
                        className="findpassmodalbottomarrow-icon"
                        alt=""
                        src={btnarrow}
                    />
                </div>
            </div>
            {recoveredEmail && <FindPwChangeModal recoveredEmail={recoveredEmail} setFindPwChangeModalOpen={setFindPwChangeModalOpen} />}
        </div>
    );
}

export default FindPassModal;