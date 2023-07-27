import React, { useEffect, useState } from 'react';
import './MusicBarV2.css';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Slider, ToggleButton } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { useRecoilState } from 'recoil';
import { IsPlayingAtom, YoutubeAtom } from '../recoil/YoutubeAtom';




const MusicBarV2 = () => {
    const [buttonvalue, setButtonvalue] = useState(() => []);
    const [isp, setIsp] = useRecoilState(IsPlayingAtom);
    const [YTP, setYTP] = useRecoilState(YoutubeAtom);
    const [currentTime, setCurrentTime] = useState(0);
    const [loop, setLoop] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [mute, setMute] = useState(false);

    useEffect(() => {
        if (YTP) {
            const timer = setInterval(() => {
                setCurrentTime(YTP?.getCurrentTime());
            }, 10);

            return () => {
                clearInterval(timer);
            };
        }
        // console.log("애옹 : ", isp);
    }, [YTP]);



    useEffect(() => {
        if (YTP)
            YTP?.setShuffle(shuffle);
    }, [shuffle]);

    useEffect(() => {
        if (YTP)
            YTP?.setLoop(loop);
    }, [loop]);
    
    useEffect(() => {
        mute ? YTP?.mute() : YTP?.unMute();
    }, [mute]);

    const handleBV = (e, v) => {
        setButtonvalue(v);
    }


    return (
        <div className='MPF'>
            <div className='MPFTop' style={{
                width: `${YTP?.getCurrentTime() / YTP?.getDuration() * 100}%`
            }} />
            <div className='MPFBody' style={{ backgroundImage: 'url("https://kr.object.ncloudstorage.com/wepli/playlist/MoluCover")' }}>
                <div className='MPFBlur' />
                <div className='MPFInfo'>
                    <img className='MPFImg' alt='eong' src='https://kr.object.ncloudstorage.com/wepli/playlist/MoluCover' />
                    <div className='MPFText'>
                        <h3 style={{ fontSize: '180%' }}>제목</h3>
                        <font style={{ fontSize: '120%' }}>가수</font>
                    </div>
                </div>
                <div className='MPFController'>
                    <div className='MPFButton'>
                        <ToggleButtonGroup color='secondary'
                            value={buttonvalue}
                            onChange={handleBV}
                            style={{ flex: '1', justifyContent: 'space-around' }}
                        >
                            <ToggleButton value='shuffle' onClick={() => {
                                setShuffle(!shuffle);
                            }}>
                                <ShuffleIcon />
                            </ToggleButton>
                            <ToggleButton onClick={() => {
                                if (YTP)
                                    YTP?.previousVideo();
                            }}>
                                <SkipPreviousIcon />
                            </ToggleButton>
                            <ToggleButton
                                onClick={() => {
                                    isp === 1 ? YTP?.pauseVideo() : YTP?.playVideo()
                                }}
                                style={{
                                    background: 'linear-gradient(145deg, rgba(0, 0, 255, 0.1), rgba(0, 0, 255, 0.5))'
                                }} >
                                {isp === 1 ? <PauseIcon style={{ fill: '#fff' }} /> : <PlayArrowIcon style={{ fill: '#FFF' }} />}
                            </ToggleButton>
                            <ToggleButton onClick={() => {
                                if (YTP)
                                    YTP?.nextVideo();
                            }}>
                                <SkipNextIcon />
                            </ToggleButton>
                            <ToggleButton value='loop' onClick={() => {
                                setLoop(!loop);
                            }}>
                                <RepeatIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className='MPFSound'>
                        <span onClick={() => {
                            setMute(!mute);
                        }}>
                            {YTP && mute ?
                                <VolumeOffIcon />
                                : YTP?.getVolume() > 50
                                    ? <VolumeUpIcon />
                                    : YTP?.getVolume() > 0
                                        ? <VolumeDownIcon />
                                        : <VolumeMuteIcon />
                            }
                        </span>
                        <Slider defaultValue={10} value={YTP?.getVolume()} onChange={(e) => { YTP?.setVolume(e.target.value); setCurrentTime(e.target.value) }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicBarV2;