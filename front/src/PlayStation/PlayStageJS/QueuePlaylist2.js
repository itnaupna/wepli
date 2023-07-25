import React, { useEffect, useRef, useState } from 'react';
import QueuePlayItemButtonSet from './QueuePlayItemButtonSet';
import { useRecoilValue } from 'recoil';
import { ButtonTypeAtom, GetBucketImgString, SecondToHMS } from '../../recoil/StageDataAtom';
import { LoginStatusAtom } from '../../recoil/LoginStatusAtom';



const QueuePlaylist2 = ({ data, rank }) => {
    const ButtonType = useRecoilValue(ButtonTypeAtom);
    const IsLogin = useRecoilValue(LoginStatusAtom);
    const [showButton, setShowButton] = useState(false);
    const btnSetRef = useRef();
    const infoRef = useRef();
    const timeinfoRef = useRef();
    useEffect(() => {
        if (showButton) {
            const width = +btnSetRef.current.offsetWidth;
            infoRef.current.style.maxWidth = `${parseInt(infoRef.current.style.maxWidth) - width}px`;
        } else {
            infoRef.current.style.maxWidth = `${420- timeinfoRef.current.offsetWidth}px`;
        }
    }, [showButton]);

    return (
        <div
            className='qplidiv'
            style={{ display: 'flex', alignItems: 'center', justifyContent: '', alignSelf: 'stretch', gap: '5px', padding: '0 5px' }}
            onMouseEnter={() => { setShowButton(true) }}
            onMouseLeave={() => { setShowButton(false) }}
        >
            <div>{rank}</div>
            <img src={data.img ? GetBucketImgString('songimg',data.img) : `https://i.ytimg.com/vi/${data.songaddress}/default.jpg`} alt='' style={{ width: '50px', height: '50px' }} />
            <div className='qpliinfo' style={{ flex: '1', maxWidth: '370px' }} ref={infoRef}>
                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {data.title}
                </div>
                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {data.singer}
                </div>
            </div>

            <div ref={timeinfoRef}>
                {
                    ButtonType === 'history' &&
                    <div>
                        {data.likes}/{data.dislikes}
                    </div>
                }
                {
                    ButtonType !== 'search' && <div>
                        {SecondToHMS(+data.songlength)}
                    </div>
                }
            </div>
            <div ref={btnSetRef}>
                {IsLogin && showButton && <QueuePlayItemButtonSet keyString={ButtonType} />}
            </div>
        </div>
    );
};

export default QueuePlaylist2;