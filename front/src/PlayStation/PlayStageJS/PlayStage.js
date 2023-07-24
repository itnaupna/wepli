import React, { useEffect, useRef, useState } from 'react';
import '../PlayStageCss/PlayStage.css';
import { useParams } from 'react-router';
import LoadingScreen from './LoadingScreen';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SocketAtom, handleSendMsg, subSocket } from '../../recoil/SocketAtom';
import StageLeftSide from './StageLeftSide';
import StageRightSide from './StageRightSide';
import { ChatItemsAtom, StageUrlAtom, UserCountInStageAtom, UsersItemsAtom } from '../../recoil/ChatItemAtom';

function PlayStage() {
    const { stageUrl } = useParams();
    const setSu = useSetRecoilState(StageUrlAtom);
    const sockClient = useRecoilValue(SocketAtom);
    const setChatLog = useSetRecoilState(ChatItemsAtom);
    const setUserList = useSetRecoilState(UsersItemsAtom);
    const setUserCount = useSetRecoilState(UserCountInStageAtom);
    const [isLoading, setIsLoading] = useState(true);
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
                    handleSocketData(JSON.parse(data.body));
                });
                setChatLog([]);
                setIsLoading(false);
                setSu(stageUrl);
                handleSendMsg('ENTER',null,stageUrl);
            }
            catch (ex) {
                setConmsg(ex.toString());
            }
        } else {
            subSocket("/sub/stage/" + stageUrl, data => {
                handleSocketData(JSON.parse(data.body));
            });
            setChatLog([]);
            setIsLoading(false);
            setSu(stageUrl);
            handleSendMsg('ENTER',null,stageUrl);
            
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


    const handleSocketData = (data) => {
        console.log(data);
        switch (data.type) {
            case 'ENTER':
                setUserList(data.msg.memberlist);
                setUserCount(+data.msg.count);
                addChatLog({
                    type:data.type,
                    nick:data.userNick,
                    msg:'님이 입장하였습니다.'
                });
                break;
            case 'EXIT':
                setUserList(data.msg.memberlist);
                setUserCount(+data.msg.count);
                addChatLog({
                    type:data.type,
                    nick:data.userNick,
                    msg:'님이 퇴장하였습니다.'
                });
                break;
            case 'SKIP':
                addChatLog({
                    type:data.type,
                    nick:data.userNick,
                    msg:'님이 현재 곡을 스킵하였습니다.'
                });
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
            case 'PLAY':
                break;
            default:
                break;
        }
    }

    return (
        <>
            {isLoading ? <div onClick={connect}><LoadingScreen msg={conmsg} /></div> : null}
            <div className="stage">
                <StageLeftSide />
                <StageRightSide />
            </div>
        </>
    );
}

export default PlayStage;