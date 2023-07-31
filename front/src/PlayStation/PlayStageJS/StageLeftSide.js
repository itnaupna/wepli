import React, { useRef, useState } from 'react';
import QueueComponent from './QueueComponent';
import YouTube from 'react-youtube';
import { useRecoilState, useRecoilValue } from 'recoil';
import { YTPOptionAtom, YoutubeAtom, loadVideoById } from '../../recoil/YoutubeAtom';
import SettingModal from './SettingModal.js';
import CSM from "./CSM";
import { Modal } from "@mui/material";


const StageLeftSide = () => {

    const [mo, setMo] = useState(false);
    const handleMo = () => setMo(true);
    const handleMc = () => setMo(false);


    const [leftType, setLeftType] = useState(true);
    const [YTP, setYTP] = useRecoilState(YoutubeAtom);
    const YTPO = useRecoilValue(YTPOptionAtom);
    // console.log(YTPO);
    //Setting Modal
    const [modalOpen, setModalOpen] = useState(false);
    //모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };
    //스테이지 삭제 버튼
    const RemoveStage = () => {
        if (window.confirm("스테이지를 삭제하시겠습니까?(스테이지 삭제 시 스테이지에 저장된 정보는 모두 삭제됩니다.)")) {
            alert("삭제되었습니다.");
        } else {
            return;
        }
    }
    // const AAA = <YouTube onReady={(e)=>{setYTA([ e.target);}}/>;
    return (

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
                    <div className="stage-button-grab stagebutton">
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

                    <div className="stage-button-up stagebutton">
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

                    <div className="stage-button-down stagebutton">
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

                    <div className="stage-button-skip stagebutton">
                        <div className="stage-button-skip-text">SKIP</div>
                    </div>
                </div>
            </div>

            <div className="stage-left-body" style={{ display: leftType ? 'block' : 'none' }}>
                
                <div className='youtubebox'>
                    <YouTube opts={YTPOptionAtom} />
                </div>
                {/* <div className='stage-left-button-group-c'>
                    <div className="stage-button-setting">
                        <button onClick={showModal} className='setting-button'>
                            <svg
                                width="50"
                                height="50"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="settings">
                                    <path id="Vector" d="M19.1411 12.9359C19.1771 12.6359 19.2011 12.3239 19.2011 11.9999C19.2011 11.6759 19.1771 11.3639 19.1291 11.0639L21.1571 9.4799C21.3371 9.3359 21.3851 9.0719 21.2771 8.8679L19.3571 5.5439C19.2371 5.3279 18.9851 5.2559 18.7691 5.3279L16.3811 6.2879C15.8771 5.9039 15.3491 5.5919 14.7611 5.3519L14.4011 2.8079C14.3651 2.5679 14.1611 2.3999 13.9211 2.3999H10.0811C9.84108 2.3999 9.64908 2.5679 9.61308 2.8079L9.25308 5.3519C8.66508 5.5919 8.12508 5.9159 7.63308 6.2879L5.24508 5.3279C5.02908 5.2439 4.77708 5.3279 4.65708 5.5439L2.73708 8.8679C2.61708 9.0839 2.66508 9.3359 2.85708 9.4799L4.88508 11.0639C4.83708 11.3639 4.80108 11.6879 4.80108 11.9999C4.80108 12.3119 4.82508 12.6359 4.87308 12.9359L2.84508 14.5199C2.66508 14.6639 2.61708 14.9279 2.72508 15.1319L4.64508 18.4559C4.76508 18.6719 5.01708 18.7439 5.23308 18.6719L7.62108 17.7119C8.12508 18.0959 8.65308 18.4079 9.24108 18.6479L9.60108 21.1919C9.64908 21.4319 9.84108 21.5999 10.0811 21.5999H13.9211C14.1611 21.5999 14.3651 21.4319 14.3891 21.1919L14.7491 18.6479C15.3371 18.4079 15.8771 18.0839 16.3691 17.7119L18.7571 18.6719C18.9731 18.7559 19.2251 18.6719 19.3451 18.4559L21.2651 15.1319C21.3851 14.9159 21.3371 14.6639 21.1451 14.5199L19.1411 12.9359ZM12.0011 15.5999C10.0211 15.5999 8.40108 13.9799 8.40108 11.9999C8.40108 10.0199 10.0211 8.3999 12.0011 8.3999C13.9811 8.3999 15.6011 10.0199 15.6011 11.9999C15.6011 13.9799 13.9811 15.5999 12.0011 15.5999Z" fill="#191D21" />
                                </g>
                            </svg>
                        </button>
                        {modalOpen && <SettingModal setModalOpen={setModalOpen} />}
                    </div>
                    <div className='stage-button-Exit' onClick={RemoveStage}>
                        <svg onCl
                            width="50"
                            height="50"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="Icon / Line / Cross Alt Square">
                                <path id="Vector" d="M24.0002 15.9999L20.0002 19.9999M20.0002 19.9999L16.0002 23.9999M20.0002 19.9999L16.0002 15.9999M20.0002 19.9999L24.0002 23.9999M20 32C16.2725 32 14.4087 32 12.9385 31.391C10.9783 30.5791 9.42092 29.0217 8.60896 27.0615C8 25.5913 8 23.7275 8 20C8 16.2725 8 14.4087 8.60896 12.9385C9.42092 10.9783 10.9783 9.42092 12.9385 8.60896C14.4087 8 16.2725 8 20 8C23.7275 8 25.5913 8 27.0615 8.60896C29.0217 9.42092 30.5791 10.9783 31.391 12.9385C32 14.4087 32 16.2725 32 20C32 23.7275 32 25.5913 31.391 27.0615C30.5791 29.0217 29.0217 30.5791 27.0615 31.391C25.5913 32 23.7275 32 20 32Z" stroke="black" stroke-width="2" stroke-linecap="round" />
                            </g>
                        </svg>
                    </div>
                </div> */}
          <button onClick={handleMo}>에오오!</button>
            <Modal open={mo} onClose={handleMc}>
                <CSM types={false} />
            </Modal>
  
            </div>
            <div style={{ display: !leftType ? 'block' : 'none', width: '100%' }}>
                <QueueComponent />
            </div>
        </div>
    );
};

export default StageLeftSide;