import React, {useState} from 'react';
import "./css/EmailConfirm.css";
import backarrow from "./svg/backarrow.svg";
import btnarrow from "./svg/btnarrow.svg";
import logo from "./photo/weplieonlylogoonlylogo.png";
import axios from "axios";
function EmailConfirmModal({setisEmailConfirmModalOpen}) {

    const [verifyKey, setVerifyKey] = useState('');
    const [verifyType, setVerifyType] = useState(0);
    const [resultRV, setResultRV] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [resultVerify, setResultVerify] = useState(false);

    const handleRequestCode = async () => {
        const url = "/api/lv1/m/requestcode";
        try{
            const res = await axios
                .post(url,{key: verifyKey });
            setResultRV(res.data);
            alert("굿")
        }catch (error){
            console.log(error);
        }
    }

    const handleVerifyCode = async ()=>{
        const url = "/api/lv1/m/verifycode";
        try{
            const res = await axios.post(url,{key:verifyKey,code:verifyCode});
            setResultVerify(res.data);
            alert("good");
        }catch(error){
            alert(error);
        }
    }

    const closeEmailConfirmModal = async () => {
        await setisEmailConfirmModalOpen(false);
    }


    return (
        <div>
            <div className="emailconfirmmodalframe" onClick={closeEmailConfirmModal}></div>
                <div className="emailconfirmmodalgroup">
                    <div className="emailconfirmmodalheader">
                        <div className="emailconfirmmodaltitlegroup">
                            <div className="emailconfirmmodaltitle">WEPLi</div>
                        </div>
                        <img
                            className="emailconfirmmodalarrowgroup-icon"
                            alt=""
                            src={backarrow}
                        />
                        <img
                            className="emailconfirmmodalweplilogo-icon"
                            alt=""
                            src={logo}
                        />
                    </div>
                    <div className="emailconfirmmodaltextgroup">
                        <div className="emailconfirmmodalcentertext">이메일 본인인증</div>
                    </div>
                    <div className="emailconfirmmodalemailinputgro">
                        <input type={'email'} className="emailconfirmmodalemailinput"
                               value={verifyKey} onChange={(e) => setVerifyKey(e.target.value)}></input>
                    </div>
                    <div className="emailconfirmemailbtngroup">
                        <div className="emailconfirmsendbtn" />
                        <button type={'button'} className="emailconfirmemailbtntext"
                         onClick={handleRequestCode}>전송</button>
                    </div>
                    <div className="emailconfirmmodalemailinputgro">
                        <input type={'text'} className="emailconfirmmodalemailinput"></input>
                    </div>
                    <div className="emailconfirmemailbtngroup">
                        <div className="emailconfirmsendbtn" />
                        <button type={'button'} className="emailconfirmemailbtntext"
                        onClick={handleVerifyCode}>확인</button>
                    </div>
                    <div className="emailconfirmmodalbtngroup">
                        <div className="emailconfirmmypagebtn">
                            <div className="emailconfirmmodalbtnrectangle" />
                            <button type={'button'} className="emailconfirmmodalbtntext">본인인증</button>
                        </div>
                        <img
                            className="emailconfirmmodalbtnarrow-icon"
                            alt=""
                            src={btnarrow}
                        />
                    </div>
                </div>
        </div>
    );

}

export default EmailConfirmModal;