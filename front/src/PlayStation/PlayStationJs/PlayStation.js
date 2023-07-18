import React from 'react';
import '../PlayStageCss/PlayStage.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
function PlayStation(props) {
    return (
        <div style={{color:"white"}}>
            라이브스테이지입니다.
            <div className='live-station-main'>
                <div className='live-station-main-parent'>
                    <div className='live-station-main-child-0'>
                            <div className='live-station-main-child-1'>
                                <div className='live-screen'>

                                </div>
                                <div className='player-ui'>
                                    <SettingsOutlinedIcon className='player-setting'>

                                    </SettingsOutlinedIcon>
                                    <div className='player-list'>

                                    </div>
                                    <div className='player-sound'>
                                        
                                    </div>
                                    <div className='player-soundbar'>

                                    </div>
                                    <div className='player-share'>

                                    </div>
                                </div>
                            </div>
                            <div className='live-station-main-child-2'>
                                <div className='Lmenu-bar'>
                                    <span className='Lmenu-chat'>
                                        채팅
                                    </span>
                                    <span className='Lmenu-playlist'>
                                        플레이리스트
                                    </span>
                                    <span className='Lmenu-user'>
                                        유저
                                    </span>
                                    <span className='Lmenu-watched'>
                                        재생기록
                                    </span>
                                </div>
                                <div className='chat-middle'>
                                    <div className='chat-room'>
                                        <div className='chat-content'>
                                            <div className='Lchat-image'>
                                                썸네일
                                            </div>
                                            <div className='Luser-info'>
                                                <div className='Luser-name'>username</div>
                                                <div className='Ltext'>ㅎㅇ</div>
                                            </div>
                                        </div>
                                        <div className='chat-input'>
                                                <div className='send-message'>
                
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayStation;