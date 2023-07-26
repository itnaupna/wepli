import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { LoginStatusAtom } from './recoil/LoginStatusAtom';
import { SignUpModalOpen, emailState, socialtypeState } from './recoil/FindIdModalAtom';
import { useNavigate } from "react-router-dom";


function NaverCallback() {
    const navi = useNavigate();
    const [signUpModalOpen, setSignUpModalOpen] = useRecoilState(SignUpModalOpen);
    const [email, setEmail] = useRecoilState(emailState);
    const [socialtype, setSocialtype] = useRecoilState(socialtypeState);
    const [loginStatus,setLoginStatus] = useRecoilState(LoginStatusAtom);
        // 회원가입 모달 오픈
        const showSignUpModal = async () => {
            setSignUpModalOpen(true);
        };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    alert("코드는"+code+"스테이트"+state);

    axios.get(`http://localhost:3000/api/lv0/m/nlogin?code=${code}&state=${state}`)
    .then(response => {
      const token = response.data.access_token;
      if (token) {
        alert("토큰 : " + token);
        localStorage.setItem('token', token);
       
        // 사용자 정보 요청
        axios.get(`http://localhost:3000/api/lv0/m/userinfo?token=${token}`)
        .then(response => {
            console.log(response.data.response); 
            alert(response.data.response.email);
            const id = response.data.response.email;

            axios.post("/api/lv0/m/social", { email:id, socialtype: 'naver' })
                        .then(res => {
                                    if (res.data.result === 'true') {
                                        console.log("res.data입니당", res.data);

                                        sessionStorage.setItem("data", JSON.stringify(res.data));
                                        setLoginStatus(true);
                                        navi("/", {
                                            state: {
                                                data: response.data.response.email,
                                            }
                                        });
                                    }
                                })
                                .catch((error) => {
                                    if (error.response && error.response.status === 417) {
                                        console.log('err : 417');
                                        alert('다른 경로로 가입된 이메일입니다.');
                                        navi('/');
                                    } else if (error.response && error.response.status === 404) {
                                        console.log('err : 404');
                                        alert('가입되지않은 이메일입니다. 회원가입으로 넘어갑니다.');
                                        setEmail(id);
                                        setSocialtype("naver");
                                        showSignUpModal();
                                        navi('/');
                                    } else {
                                        console.log('err : ', error.response ? error.response.status : error);
                                        console.log({ email:id, socialtype: 'naver' });
                                    }
                                });

        })
        .catch(err => console.log(err))
        
        } else {
        console.error("Access token not found");
      }
    })
    .catch(err => console.log(err))
}, []);


  return (
    <div>
      <h1>네이버 콜백 JS</h1>
    </div>
  )
}

export default NaverCallback;