import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function NaverCallback() {

    const [naverId,setNaverId] = useState('');

    const { naver } = window
	const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
	const NAVER_CALLBACK_URL = "http://localhost:3000/nlogin"

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_CALLBACK_URL,
			isPopup: false,
			loginButton: { color: 'green', type: 3, height: 58 },
			callbackHandle: true,
		})
		naverLogin.init()

      naverLogin.getLoginStatus(async function (status) {
			if (status) {
              // 아래처럼 선택하여 추출이 가능하고, 
				const userid = naverLogin.user.getEmail()
                alert("유저 아이디"+userid);
              // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
               setNaverId(naverLogin.user)
			}
		})     
	}
        
    // 화면 첫 렌더링이후 바로 실행
	useEffect(() => {
		initializeNaverLogin()
	}, [])


	return (
		<div>
			<div id="naverIdLogin" />
        </div>
	)
}

export default NaverCallback;