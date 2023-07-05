import React from 'react';
import '../PlayStageCss/PlayStage.css';
function PlayStage(props) {
    return (
        <div className='Live-Background'>
            <div className='Side-Bar'>
                <div className='Home-Image'>
                </div>
            </div>
            <div style={{color:'white'}}>
                
                <div >
                    <div className='Main-Section'>

                        <div className='Live-Screen'>

                        </div>
                        <div className='Screen-Bar'>
                            <button className='Lsetting'></button>

                        </div>
                        <div className='Second-Section'>
                            <div className='Lmenu-Bar'>
                                    <button className='w-btn w-btn-gra2 w-btn-gra-anim 'type='button' value={'chat'}>Chat</button>
                                    <button className='w-btn w-btn-gra2 w-btn-gra-anim 'type='button' value={'playlist'}>PlayList</button>
                                    <button className='w-btn w-btn-gra2 w-btn-gra-anim 'type='button' value={'users'}>Users</button>
                                    <button className='w-btn w-btn-gra2 w-btn-gra-anim 'type='button' value={'play-record'}>Record</button>
                            </div>
                            <div className='Lmenu-ChatRoom'>
                                <div className='Chat-Message'>
                                    <ul className='Chat-Main'>
                                        <li className='Chat-Content'>
                                            <div className='Chat-Info'>
                                                <div className='image-row'>
                                                    
                                                </div>
                                                <div className='activity-row'>
                                                    <div className='username'>
                                                        <span className='user-role-icon'></span>
                                                        UserName
                                                        <span className='user-role'>
                                                            creator
                                                        </span>
                                                    </div>
                                                    <div className='text'>
                                                        <p>안녕하세요</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayStage;