import React from 'react';
import { Qdelete,  Qgrab, Qorder, Qplay} from '../PlayStageImage/Icon';


const QueuePlaylist = ({data,rank}) => {
    return (
        <div className='qplidiv' style={{ display: 'flex', alignItems: 'center', justifyContent: '', alignSelf: 'stretch', gap: '5px', padding: '0 5px' }}>
            <div>{rank}</div>
            <img src={data.snippet.thumbnails.default.url} alt='' style={{ width: '50px', height: '50px' }} />
            <div className='qpliinfo' style={{ flex: '1', maxWidth: '370px' }}>
                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {/* {data.snippet.title} */}
                    <span dangerouslySetInnerHTML={{__html:data.snippet.title}}/>
                </div>
                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {data.snippet.channelTitle}
                </div>
            </div>
            <div>
                99:99:99
            </div>
            <div className="qitembuttons" style={{ display: 'none' }}>
                <div className="queueallbutton">
                    <img className="play-icon" alt="" src={Qplay} />
                </div>
                <div className="queueallbutton">
                    <img className="order-icon" alt="" src={Qorder} />
                </div>
                <div className="queueallbutton">
                    <img className="stagebuttongrabicon" alt="" src={Qgrab} />
                </div>
                <div className="queueallbutton">
                    <img className="delete-icon" alt="" src={Qdelete} />
                </div>
            </div>
        </div>
    );
};

export default QueuePlaylist;