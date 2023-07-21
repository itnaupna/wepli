import React, { useEffect, useRef, useState } from 'react';
import '../PlayStageCss/PlayStage.css';
import YouTube from 'react-youtube';
import ChatItem from './ChatItem';
import { useParams } from 'react-router';
import LoadingScreen from './LoadingScreen';
import StageButtonChatIcon from '../PlayStageImage/Icon/StageButtonChatIcon.svg';
import { useRecoilValue } from 'recoil';
import { SocketAtom, subSocket } from '../../recoil/SocketAtom';
import StageLeftSide from './StageLeftSide';
import StageRightSide from './StageRightSide';
// import { VideoInfoAtom } from '../../recoil/VideoInfoAtom';

function PlayStage() {
    const [leftType, setLeftType] = useState(true);
    const [rightType, setRightType] = useState(true);
    // const [youtube, setYoutube] = useState('VlMxBy_I3Nk');
    const { stageUrl } = useParams();
    const sockClient = useRecoilValue(SocketAtom);
    const [chatLog, setChatLog] = useState([]);
    const [chat, setChat] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const chatLogs = useRef();
    const [conmsg, setConmsg] = useState('접속중');

    const BUCKET_URL = process.env.REACT_APP_BUCKET_URL;

    useEffect(() => {
        connect();
    }, []);

    const connect = async () => {
        if (!sockClient.connected) {
            try {
                await waitConnect();
                subSocket("/sub/stage/" + stageUrl, data => {
                    loggingChat(JSON.parse(data.body));
                });
                setIsLoading(false);
            }
            catch (ex) {
                setConmsg(ex.toString());
            }
        } else {
            subSocket("/sub/stage/" + stageUrl, data => {
                loggingChat(JSON.parse(data.body));
            });
            setIsLoading(false);
        }
    }

    const waitConnect = () => {
        return new Promise((resolve, reject) => {
            const limit = 10;
            const intervalTime = 500;
            let currentAttempt = 0;
            const interval = setInterval(() => {
                if (currentAttempt > limit - 1) {
                    clearInterval(interval);
                    reject(new Error("연결에 실패했습니다. 다시 접속해주세요."));
                } else if (sockClient.connected) {
                    clearInterval(interval);
                    resolve();
                }
                currentAttempt++;
            }, intervalTime);
        });
    }

    const addChatLog = (e) => {
        setChatLog(chatLog => [
            ...chatLog,
            e
        ]);
    }

    const loggingChat = (data) => {
        switch (data.type) {
            case 'ENTER':
                break;
            case 'EXIT':
                break;
            case 'SKIP':
                break;
            case 'VOTE_UP':
                break;
            case 'VOTE_DOWN':
                break;
            case 'KICK':
                break;
            case 'BAN':
                break;
            case 'DELETE':
                break;
            case 'QUEUE_IN':
                break;
            case 'QUEUE_OUT':
                break;
            case 'QUEUE_ORDER_CHANGE':
                break;
            case 'QUEUE_ORDER_SONG':
                break;
            case 'CHAT':
                addChatLog({
                    type: data.type,
                    img: `${BUCKET_URL}/profile/${data.img}`,
                    date: new Date().toLocaleString(),
                    msg: data.msg,
                    nick: data.userNick
                });
                break;
            default:
                break;
        }
    }
    
    const SendMsg = (e) => {
        sockClient.send("/pub/msg", {}, JSON.stringify(e));
    }

    const handleSendMsg = (type, msg) => {
        msg = msg?.trim();
        let userNick = JSON.parse(sessionStorage.getItem('data') || localStorage.getItem('data'));
        // console.log("NICK : " + userNick);
        switch (type) {
            case 'ENTER':
                break;
            case 'EXIT':
                break;
            case 'SKIP':
                break;
            case 'VOTE_UP':
                break;
            case 'VOTE_DOWN':
                break;
            case 'KICK':
                break;
            case 'BAN':
                break;
            case 'DELETE':
                break;
            case 'QUEUE_IN':
                break;
            case 'QUEUE_OUT':
                break;
            case 'QUEUE_ORDER_CHANGE':
                break;
            case 'QUEUE_ORDER_SONG':
                break;
            case 'CHAT':
                if (msg.trim().length === 0 || !userNick) break;
                SendMsg({
                    type,
                    stageId: stageUrl,
                    userNick: userNick?.nick,
                    msg
                });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        chatLogs.current.scrollTop = chatLogs.current.scrollHeight;
    }, [chatLog]);


    return (
        <>
            {isLoading ? <div onClick={connect}><LoadingScreen msg={conmsg} /></div> : null}
            <div className="stage">
                <StageLeftSide data={{ leftType, setLeftType }} />
                <StageRightSide data={{ rightType, setRightType }} />
            </div>
        </>
    );
}

export default PlayStage;