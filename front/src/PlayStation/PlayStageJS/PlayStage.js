import React, { useEffect, useRef, useState } from 'react';
import '../PlayStageCss/PlayStage.css';
import YouTube from 'react-youtube';
import ChatItem from './ChatItem';
import { useParams } from 'react-router';
import * as SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';
import SettingModal from './SettingModal.js';

function PlayStage() {
    const [leftType, setLeftType] = useState(true);
    const [rightType, setRightType] = useState(true);
    const [youtube, setYoutube] = useState('VlMxBy_I3Nk');
    const { stageUrl } = useParams();
    const sockClient = useRef();
    const [chatLog, setChatLog] = useState([]);
    const [chat,setChat] = useState('');
    useEffect(() => {
        connect();
    }, []);


    const connect = () => {
        sockClient.current?.disconnect(() => console.log("기존연결 종료"));
        let sock = new SockJS("https://localhost/ws");
        sockClient.current = StompJS.Stomp.over(sock);

        let ws = sockClient.current;

        ws.connect({}, () => {
            ws.subscribe("/sub/stage/" + stageUrl, data => {
                console.log(data);
            });
        });
    };

    const handleSendMsg = (type, userNick, msg) => {
        msg=msg?.trim();
        if(type==="CHAT" && msg.trim().length===0) return;
        sockClient.current.send("/pub/msg", {}, JSON.stringify({
            type,
            stageId: stageUrl,
            userNick,
            msg
        }));
    };
    //Setting Modal
    const [modalOpen,setModalOpen] = useState(false);
    //모달창 노출
    const showModal = () =>{
        setModalOpen(true);
    };
    


    return (
        <div className="stage">
            {/* {stageUrl} */}
            <div className="stage-left">
                <div className="stage-left-header">
                    <div className="stage-left-button-group-a">
                        <div className={"stagebutton stage-button-stage" + (leftType ? ' stageactive' : '')}
                            onClick={() => setLeftType(true)}>
                            <div className="stage-button-stage-text">스테이지</div>
                        </div>

                        <div className={"stagebutton stage-button-queue" + (leftType ? '' : ' stageactive')}
                            onClick={() => setLeftType(false)}>
                            <div className="stage-button-queue-text">대기열</div>
                        </div>
                    </div>

                    <div className="stage-left-button-group-b">
                        <div className="stage-button-grab">
                            <svg
                                className="stage-button-grab-icon"
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.1944 40.7143V25.6154M31.25 19.6843V19.4505C31.25 16.5566 29.1802 14.4331 27.0435 15.135L15.7588 18.842C14.2517 19.337 13.1944 21.1163 13.1944 23.1575V25.6154M31.25 19.6843V36.4286M31.25 19.6843L13.1944 25.6154M13.1944 37.8571H10.8796C8.32276 37.8571 6.25 39.9891 6.25 42.619C6.25 43.934 7.28638 45 8.56482 45C11.1217 45 13.1944 42.868 13.1944 40.2381V37.8571ZM31.25 33.5714H28.9352C26.3783 33.5714 24.3056 35.7034 24.3056 38.3333C24.3056 39.6483 25.3419 40.7143 26.6204 40.7143C29.1772 40.7143 31.25 38.5823 31.25 35.9524V33.5714Z"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M36.25 5V10M36.25 10V15M36.25 10H31.25M36.25 10H41.25"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <div className="stage-button-up">
                            <svg
                                className="stage-button-up-icon"
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M37.6341 31.3974L38.712 25.2778C38.9813 23.7493 37.7841 22.3513 36.2059 22.3513H28.2904C27.5058 22.3513 26.9084 21.6599 27.0354 20.899L28.0478 14.8321C28.2123 13.8465 28.1653 12.838 27.9099 11.8713C27.6983 11.0705 27.069 10.4274 26.2414 10.1664L26.0199 10.0965C25.5198 9.93877 24.9738 9.97548 24.5022 10.1986C23.9832 10.4442 23.6034 10.8921 23.4627 11.4248L22.7359 14.1756C22.5047 15.0508 22.1678 15.8957 21.7335 16.6939C21.099 17.8603 20.1179 18.7937 19.098 19.6565L16.8999 21.5162C16.2802 22.0406 15.9547 22.8258 16.0252 23.6266L17.266 37.7156C17.3799 39.0079 18.4803 40 19.8 40H26.902C32.2207 40 36.7598 36.3616 37.6341 31.3974Z"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M11.25 22.3513L12.7344 39.2061C12.772 39.633 12.4296 40 11.9936 40C11.5829 40 11.25 39.6728 11.25 39.2691V22.3513Z"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>

                        <div className="stage-button-down">
                            <svg
                                className="stage-button-down-icon"
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M37.6341 18.6026L38.712 24.7222C38.9813 26.2507 37.7841 27.6487 36.2059 27.6487H28.2904C27.5058 27.6487 26.9084 28.3401 27.0354 29.101L28.0478 35.1679C28.2123 36.1535 28.1653 37.162 27.9099 38.1287C27.6983 38.9295 27.069 39.5726 26.2414 39.8336L26.0199 39.9035C25.5198 40.0612 24.9738 40.0245 24.5022 39.8014C23.9832 39.5558 23.6034 39.1079 23.4627 38.5752L22.7359 35.8244C22.5047 34.9492 22.1678 34.1043 21.7335 33.3061C21.099 32.1397 20.1179 31.2063 19.098 30.3435L16.8999 28.4838C16.2802 27.9594 15.9547 27.1742 16.0252 26.3734L17.266 12.2844C17.3799 10.9921 18.4803 10 19.8 10H26.902C32.2207 10 36.7598 13.6384 37.6341 18.6026Z"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M11.25 27.6487L12.7344 10.7939C12.772 10.367 12.4296 10 11.9936 10C11.5829 10 11.25 10.3272 11.25 10.7309V27.6487Z"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>

                        <div className="stage-button-skip">
                            <div className="stage-button-skip-text">SKIP</div>
                        </div>
                        
                    </div>
                </div>
                <div className='stage-left-button-group-c'>
                    <div className="stage-button-setting">
                        <button onClick={showModal} className='setting-button'>
                        <svg 
                        width="50" 
                        height="50" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                            <g id="settings">
                            <path id="Vector" d="M19.1411 12.9359C19.1771 12.6359 19.2011 12.3239 19.2011 11.9999C19.2011 11.6759 19.1771 11.3639 19.1291 11.0639L21.1571 9.4799C21.3371 9.3359 21.3851 9.0719 21.2771 8.8679L19.3571 5.5439C19.2371 5.3279 18.9851 5.2559 18.7691 5.3279L16.3811 6.2879C15.8771 5.9039 15.3491 5.5919 14.7611 5.3519L14.4011 2.8079C14.3651 2.5679 14.1611 2.3999 13.9211 2.3999H10.0811C9.84108 2.3999 9.64908 2.5679 9.61308 2.8079L9.25308 5.3519C8.66508 5.5919 8.12508 5.9159 7.63308 6.2879L5.24508 5.3279C5.02908 5.2439 4.77708 5.3279 4.65708 5.5439L2.73708 8.8679C2.61708 9.0839 2.66508 9.3359 2.85708 9.4799L4.88508 11.0639C4.83708 11.3639 4.80108 11.6879 4.80108 11.9999C4.80108 12.3119 4.82508 12.6359 4.87308 12.9359L2.84508 14.5199C2.66508 14.6639 2.61708 14.9279 2.72508 15.1319L4.64508 18.4559C4.76508 18.6719 5.01708 18.7439 5.23308 18.6719L7.62108 17.7119C8.12508 18.0959 8.65308 18.4079 9.24108 18.6479L9.60108 21.1919C9.64908 21.4319 9.84108 21.5999 10.0811 21.5999H13.9211C14.1611 21.5999 14.3651 21.4319 14.3891 21.1919L14.7491 18.6479C15.3371 18.4079 15.8771 18.0839 16.3691 17.7119L18.7571 18.6719C18.9731 18.7559 19.2251 18.6719 19.3451 18.4559L21.2651 15.1319C21.3851 14.9159 21.3371 14.6639 21.1451 14.5199L19.1411 12.9359ZM12.0011 15.5999C10.0211 15.5999 8.40108 13.9799 8.40108 11.9999C8.40108 10.0199 10.0211 8.3999 12.0011 8.3999C13.9811 8.3999 15.6011 10.0199 15.6011 11.9999C15.6011 13.9799 13.9811 15.5999 12.0011 15.5999Z" fill="#191D21"/>
                            </g>
                        </svg>
                        </button>
                        {modalOpen && <SettingModal setModalOpen={setModalOpen}/>}
                    </div>
                    <div className='stage-button-Exit'>
                    <svg 
                        width="50" 
                        height="50" 
                        viewBox="0 0 40 40" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="Icon / Line / Cross Alt Square">
                        <path id="Vector" d="M24.0002 15.9999L20.0002 19.9999M20.0002 19.9999L16.0002 23.9999M20.0002 19.9999L16.0002 15.9999M20.0002 19.9999L24.0002 23.9999M20 32C16.2725 32 14.4087 32 12.9385 31.391C10.9783 30.5791 9.42092 29.0217 8.60896 27.0615C8 25.5913 8 23.7275 8 20C8 16.2725 8 14.4087 8.60896 12.9385C9.42092 10.9783 10.9783 9.42092 12.9385 8.60896C14.4087 8 16.2725 8 20 8C23.7275 8 25.5913 8 27.0615 8.60896C29.0217 9.42092 30.5791 10.9783 31.391 12.9385C32 14.4087 32 16.2725 32 20C32 23.7275 32 25.5913 31.391 27.0615C30.5791 29.0217 29.0217 30.5791 27.0615 31.391C25.5913 32 23.7275 32 20 32Z" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        </g>
                    </svg>
                    </div>
                </div>
                <div className="stage-left-body">
                    <YouTube
                        key={'YTP'}
                        videoId={youtube} />
                </div>
            </div>

            <div className="stage-right">
                <div className="stage-right-header">
                    <div className={(rightType ? 'rightactive ' : '') + "rightbutton stage-button-chat"}
                        onClick={() => setRightType(true)}>
                        <svg
                            className="stage-button-chat-icon"
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21 28.5H33M21 22.5H39M21 12H39C43.9706 12 48 16.1973 48 21.375V30.625C48 35.8027 43.9706 40 39 40H30.7026C30.2574 40 29.8352 40.206 29.5502 40.5622L23.8262 47.7173C23.3771 48.2787 22.5 47.9479 22.5 47.2172V41.5625C22.5 40.6996 21.8284 40 21 40C16.0294 40 12 35.8027 12 30.625V21.375C12 16.1973 16.0294 12 21 12Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className={(rightType ? '' : 'rightactive ') + "rightbutton stage-button-people"}
                        onClick={() => setRightType(false)}>
                        <svg
                            className="stage-button-people-icon"
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M27.6394 31C27.6394 31.5523 28.0871 32 28.6394 32C29.1917 32 29.6394 31.5523 29.6394 31H27.6394ZM10.0217 31C10.0217 31.5523 10.4694 32 11.0217 32C11.574 32 12.0217 31.5523 12.0217 31H10.0217ZM31.4751 24.8783V23.8783C30.9268 23.8783 30.4808 24.3196 30.4751 24.8678C30.4694 25.416 30.9061 25.8666 31.4541 25.878L31.4751 24.8783ZM30.9734 14.6957C30.4211 14.6957 29.9734 15.1434 29.9734 15.6957C29.9734 16.2479 30.4211 16.6957 30.9734 16.6957V14.6957ZM35.9589 31C35.9589 31.5523 36.4066 32 36.9589 32C37.5112 32 37.9589 31.5523 37.9589 31H35.9589ZM8.52461 24.8783L8.54552 25.878C9.09361 25.8666 9.53029 25.416 9.52456 24.8678C9.51882 24.3196 9.07282 23.8783 8.52461 23.8783V24.8783ZM9.02659 16.6957C9.57888 16.6957 10.0266 16.2479 10.0266 15.6957C10.0266 15.1434 9.57888 14.6957 9.02659 14.6957V16.6957ZM2.04109 31C2.04109 31.5523 2.48881 32 3.04109 32C3.59338 32 4.04109 31.5523 4.04109 31H2.04109ZM25.4372 15.6C25.4372 18.6918 22.928 21.2 19.8306 21.2V23.2C24.0307 23.2 27.4372 19.7983 27.4372 15.6H25.4372ZM19.8306 21.2C16.7332 21.2 14.2239 18.6918 14.2239 15.6H12.2239C12.2239 19.7983 15.6305 23.2 19.8306 23.2V21.2ZM14.2239 15.6C14.2239 12.5082 16.7332 10 19.8306 10V8C15.6305 8 12.2239 11.4017 12.2239 15.6H14.2239ZM19.8306 10C22.928 10 25.4372 12.5082 25.4372 15.6H27.4372C27.4372 11.4017 24.0307 8 19.8306 8V10ZM12.0217 31C12.0217 29.769 12.0233 28.6802 12.1509 27.7043C12.2773 26.7373 12.519 25.9628 12.9454 25.3462C13.7576 24.1715 15.5204 23.2 19.8306 23.2V21.2C15.3319 21.2 12.6903 22.1984 11.3003 24.2087C10.6255 25.1846 10.3167 26.3063 10.1678 27.445C10.0201 28.5747 10.0217 29.8009 10.0217 31H12.0217ZM19.8089 23.1998C24.1301 23.2936 25.904 24.2615 26.7198 25.4237C27.1442 26.0283 27.3846 26.7838 27.5105 27.733C27.6377 28.6928 27.6394 29.7685 27.6394 31H29.6394C29.6394 29.8015 29.6411 28.586 29.4931 27.4701C29.3437 26.3436 29.0335 25.2387 28.3568 24.2747C26.9704 22.2997 24.3398 21.2977 19.8523 21.2002L19.8089 23.1998ZM34.3684 20.287C34.3684 21.4049 34.0893 22.3147 33.6195 22.9209C33.1756 23.4937 32.5012 23.8783 31.4751 23.8783V25.8783C33.0841 25.8783 34.3564 25.235 35.2003 24.1461C36.0184 23.0905 36.3684 21.7047 36.3684 20.287H34.3684ZM30.9734 16.6957C32.9853 16.6957 34.3684 18.2297 34.3684 20.287H36.3684C36.3684 17.2728 34.2319 14.6957 30.9734 14.6957V16.6957ZM31.4541 25.878C34.5954 25.9438 35.4226 26.6275 35.7183 27.1878C35.8967 27.5261 35.981 27.9852 35.997 28.6595C36.0048 28.9907 35.9963 29.346 35.9846 29.7424C35.9732 30.1313 35.9589 30.5592 35.9589 31H37.9589C37.9589 30.5955 37.972 30.2024 37.9838 29.801C37.9953 29.4072 38.0057 29.003 37.9964 28.6122C37.9782 27.8425 37.8844 27.0075 37.4872 26.2545C36.6314 24.6325 34.7167 23.9459 31.496 23.8785L31.4541 25.878ZM3.63158 20.287C3.63158 21.7047 3.98146 23.0905 4.79945 24.146C5.64334 25.235 6.91556 25.8783 8.52461 25.8783V23.8783C7.49846 23.8783 6.82417 23.4937 6.38034 22.921C5.91061 22.3148 5.63158 21.4049 5.63158 20.287H3.63158ZM9.02659 14.6957C5.76807 14.6957 3.63158 17.2728 3.63158 20.287H5.63158C5.63158 18.2297 7.01471 16.6957 9.02659 16.6957V14.6957ZM8.5037 23.8785C5.283 23.9459 3.36835 24.6325 2.51265 26.2546C2.11545 27.0075 2.0217 27.8425 2.00352 28.6122C1.99429 29.003 2.00465 29.4072 2.0162 29.801C2.02798 30.2024 2.04109 30.5956 2.04109 31H4.04109C4.04109 30.5592 4.02675 30.1313 4.01534 29.7424C4.00371 29.3459 3.99514 28.9907 4.00297 28.6595C4.01889 27.9852 4.10316 27.526 4.2816 27.1878C4.57717 26.6275 5.40428 25.9438 8.54552 25.878L8.5037 23.8785Z"
                                fill="black"
                            />
                        </svg>

                        <div className="stage-button-people-count">0</div>

                        <div className="">+</div>

                        <div className="stage-button-guest-count">0</div>
                    </div>
                </div>

                <div className="stagechatwrapper" style={{ display: (rightType ? 'flex' : 'none') }}>
                    <div className="stage-chat-body">
                        {/* TODO : ChatItem 컴포넌트화 */}
                        <ChatItem /><ChatItem /><ChatItem /><ChatItem /><ChatItem /><ChatItem />

                    </div>

                    <div className="stage-chat-tail">
                        <textarea className="stage-chat-input" value={chat} onChange={(e)=>setChat(e.target.value)}></textarea>

                        <svg
                            className="stage-chat-send-button"
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={()=>{handleSendMsg("CHAT","TESTNICK",chat);setChat('');}}
                        >
                            <path
                                d="M21 28.5H33M21 22.5H39M21 12H39C43.9706 12 48 16.1973 48 21.375V30.625C48 35.8027 43.9706 40 39 40H30.7026C30.2574 40 29.8352 40.206 29.5502 40.5622L23.8262 47.7173C23.3771 48.2787 22.5 47.9479 22.5 47.2172V41.5625C22.5 40.6996 21.8284 40 21 40C16.0294 40 12 35.8027 12 30.625V21.375C12 16.1973 16.0294 12 21 12Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>

                <div className="stagepeoplewrapper" style={{ display: (rightType ? 'none' : 'flex') }}>
                    <div className="stage-people-body">
                        <div className="stage-people-item">
                            <img className="stage-people-img" src="stage-people-img.png" alt='profileImg' />
                            <div className="stage-people-nickname">JJ the Master 👑</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayStage;