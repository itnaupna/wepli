import React, { useState } from 'react';
import '../PlayStageCss/LoadingScreen.css';
const LoadingScreen = ({ msg, isLoading,setShowLoading }) => {
    let [show, setShow] = useState(true);
    if (show)
        return (
            <div id="wrapper" onClick={()=>{
                if(!isLoading) {setShow(false); setShowLoading(false);}
            }}>
                {isLoading && <>
                    <div class="profile-main-loader">
                        <div class="loader">
                            <svg class="circular-loader" viewBox="25 25 50 50" >
                                <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="2" />
                            </svg>
                        </div>
                    </div>
                    <div class="loadingmsg">{msg}</div>
                </>
                }
                {!isLoading && <>
                    <div className='loadingmsg'>
                        스테이지에 입장 준비가 완료되었습니다. <br />
                        <br />
                        클릭하면 입장합니다.
                    </div>
                </>}
            </div>
        );
    else
        return null;
};

export default LoadingScreen;