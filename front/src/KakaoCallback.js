import React, { useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function KakaoCallback() {
    const navi = useNavigate();

    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        console.log("카카오콜백", params);
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = "9d3f5e52469d4278fcbcbc2f8a944d2c";
        const REDIRECT_URI = "http://localhost:3000/auth";

        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
            .then((res) => {
                const { access_token } = res.data;
                axios.post(
                    `https://kapi.kakao.com/v2/user/me`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        }
                    }
                )
                    .then((res) => {
                        const { kakao_account } = res.data;
                        if (kakao_account.profile.nickname) {
                            console.log('전체', res.data);
                            console.log('이메일', kakao_account.email);
                            let email = kakao_account.email;
                            console.log("dd", email);

                            axios.post("/api/lv0/social", { email, socialtype: 'kakao' })
                                .then(res => {
                                    if (res.data.result === 'true') {
                                        console.log("res.data입니당", res.data);

                                        sessionStorage.setItem("data", JSON.stringify(res.data));
                                        navi("/", {
                                            state: {
                                                data: kakao_account.email,
                                            }
                                        });
                                    }
                                })
                                .catch((error) => {
                                    if (error.response && error.response.status === 417) {
                                        console.log('err : 417');
                                        navi('/');
                                    } else if (error.response && error.response.status === 404) {
                                        console.log('err : 404');
                                        navi('/');
                                    } else {
                                        console.log('err : ', error.response ? error.response.status : error);
                                        console.log({ email, socialtype: 'kakao' });
                                    }
                                });
                        }
                    })
                    .catch((error) => {
                        console.log('err:', error);
                    });
            })
            .catch((error) => {
                console.log('err:', error);
            });
    }, []);

    return (
        <div>
            <h1>카카오콜백JS</h1>
        </div>
    );
}

export default KakaoCallback;
