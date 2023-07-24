import React from 'react';
import { Qdelete,  Qgrab, Qorder,   Qremuser, } from '../PlayStageImage/Icon';


const QueueStagePlaylist = () => {
    return (
        <div className='qplidiv' style={{ display: 'flex', alignItems: 'center', justifyContent: '', alignSelf: 'stretch', gap: '5px', padding: '0 5px' }}>
            <div>999</div>
            <img src={Qdelete} alt='' style={{ width: '50px', height: '50px' }} />
            <div className='qpliinfo' style={{ flex: '1', maxWidth: '370px' }}>
                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
                </div>
                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    가수와 재생자가 들어갑니다.
                </div>
            </div>
            <div>
            <div>
                999/999
            </div>
            <div>
                99:99:99
            </div>
            </div>
            <div className="qitembuttons" style={{ display: 'none' }}>
                <div className="queueallbutton">
                    <img className="play-icon" alt="" src={Qorder} />
                </div>
                <div className="queueallbutton">
                    <img className="stagebuttongrabicon" alt="" src={Qgrab} />
                </div>
                <div className="queueallbutton">
                    <img className="stagebuttongrabicon" alt="" src={Qremuser} />
                </div>
                <div className="queueallbutton">
                    <img className="stagebuttongrabicon" alt="" src={Qdelete} />
                </div>
            </div>
        </div>
    );
};

export default QueueStagePlaylist;