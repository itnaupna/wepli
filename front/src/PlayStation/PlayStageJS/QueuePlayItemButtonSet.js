import React from 'react';
import { Qdelete, Qgrab, Qorder, Qplay, Qremuser } from '../PlayStageImage/Icon';
import { useRecoilState } from 'recoil';
import { IsGrabbingAtom, getIsGrabbingAtom } from '../../recoil/StageDataAtom';

const QPlayButton = ({ data }) => {
    
    const handleClick = () => {

    }
    return (
        <div className="queueallbutton">
            <img className="play-icon" alt="" src={Qplay} />
        </div>
    );
};

const QOrderButton = ({ data }) => {

    const handleClick = () => {

    }
    return (
        <div className="queueallbutton">
            <img className="order-icon" alt="" src={Qorder} />
        </div>
    );
};

const QGrabButton = ({ data,index }) => {
    const [IsGrabbing, setIsGrabbing] = useRecoilState(getIsGrabbingAtom(index));
    const handleClick = () => {
        setIsGrabbing(true);
    }
    return (
        <div className="queueallbutton" onClick={handleClick}>
            <img className="stagebuttongrabicon" alt="" src={Qgrab} />
        </div>
    );
};

const QDeleteButton = ({ data }) => {
    const handleClick = () => {

    }
    return (
        <div className="queueallbutton">
            <img className="delete-icon" alt="" src={Qdelete} />
        </div>
    );
};

const QRemuserButton = ({ data }) => {
    const handleClick = () => {

    }
    return (
        <div className="queueallbutton">
            <img className="stagebuttongrabicon" alt="" src={Qremuser} />
        </div>
    )

}


const QueuePlayItemButtonSet = ({ keyString, data,index }) => {
    const set = {
        normal: {
            e: [QPlayButton, QOrderButton, QGrabButton, QDeleteButton],
        },
        stagequeue: {
            e: [QOrderButton, QGrabButton, QRemuserButton, QDeleteButton],
        },
        history: {
            e: [QPlayButton, QGrabButton]
        },
        search: {
            e: [QPlayButton, QGrabButton]
        },
        myqueue: {
            e: [QGrabButton, QOrderButton, QDeleteButton]
        }
    };
    const ComponentList = set[keyString].e;

    return (
        <div className="qitembuttons" style={{ display: 'none' }}>
            {ComponentList.map((Component, i) => <Component key={i} data={data} index={index} />)}
        </div>
    );
};

export default QueuePlayItemButtonSet;
