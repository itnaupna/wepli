import React, { useEffect, useRef, useState } from 'react';
import '../PlayStageCss/PlayStage.css';
import { useParams } from 'react-router';
import LoadingScreen from './LoadingScreen';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { SocketAtom, handleSendMsg, subSocket } from '../../recoil/SocketAtom';
import StageLeftSide from './StageLeftSide';
import StageRightSide from './StageRightSide';
import { ChatItemsAtom, StageUrlAtom, UserCountInStageAtom, UsersItemsAtom } from '../../recoil/ChatItemAtom';
import { LoginStatusAtom } from '../../recoil/LoginStatusAtom';
import { IsInQueueAtom, MyQListAtom, RoomQListAtom } from '../../recoil/StageDataAtom';


function PlayStage() {
    const { stageUrl } = useParams();
    const [su, setSu] = useRecoilState(StageUrlAtom);
    const sockClient = useRecoilValue(SocketAtom);
    const setChatLog = useSetRecoilState(ChatItemsAtom);
    const setUserList = useSetRecoilState(UsersItemsAtom);
    const setUserCount = useSetRecoilState(UserCountInStageAtom);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoading, setShowLoading] = useState(true);

    const [conmsg, setConmsg] = useState('접속중');
    const IsLogin = useRecoilValue(LoginStatusAtom);
    const [isInQueue, setIsInQueue] = useRecoilState(IsInQueueAtom);
    const [myQueue, setMyQueue] = useRecoilState(MyQListAtom);
    const [roomQueue, setRoomQueue] = useRecoilState(RoomQListAtom);

    const BUCKET_URL = process.env.REACT_APP_BUCKET_URL;

    // useEffect(() => {
    //     if (isInQueue) {
    //         handleSendMsg("QUEUE_IN", myQueue[0], su);
    //     }
    // }, [isInQueue]);

    useEffect(() => {
        // console.log("내 큐길이 : ", myQueue.length);
        // console.log("큐 첫번째값 : ", myQueue[0]);
        if (isLoading) return;
        setIsInQueue(myQueue.length > 0);
        if (myQueue.length > 0) {
            handleSendMsg("QUEUE_CHANGE_SONG", myQueue[0], su);
        } else {
            handleSendMsg("QUEUE_OUT", null, su);
        }
    }, [myQueue[0]]);



    useEffect(() => {
        connect();
    }, [IsLogin]);

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
                handleSendMsg('ENTER', null, stageUrl);
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
            handleSendMsg('ENTER', null, stageUrl);

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
        // console.log("패킷수신 " + data.msg.toString());
        switch (data.type) {
            case 'ENTER':
                setUserList(data.msg.memberlist);
                setUserCount(+data.msg.count);
                addChatLog({
                    type: data.type,
                    nick: data.userNick,
                    msg: '님이 입장하였습니다.'
                });
                break;
            case 'EXIT':
                setUserList(data.msg.memberlist);
                setUserCount(+data.msg.count);
                addChatLog({
                    type: data.type,
                    nick: data.userNick,
                    msg: '님이 퇴장하였습니다.'
                });
                break;
            case 'SKIP':
                addChatLog({
                    type: data.type,
                    nick: data.userNick,
                    msg: '님이 현재 곡을 스킵하였습니다.'
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
                setRoomQueue(
                    data.msg
                );
                addChatLog({
                    type: data.type,
                    nick: data.userNick,
                    msg: '님이 스테이지 플리에 참여하였습니다.'
                });
                break;
            case 'QUEUE_OUT':
                setRoomQueue(data.msg);
                addChatLog({
                    type: data.type,
                    nick: data.userNick,
                    msg: '님이 스테이지 플리에서 나갔습니다.'
                });
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
                console.log(data);
                break;
            case 'QUEUE_DATA':
                setRoomQueue(
                    data.msg
                );
                break;
            default:
                break;
        }
    }

    return (
        <>
            {/* {isLoading ? <div onClick={connect}><LoadingScreen msg={conmsg} isLoading={isLoading}/></div> : null} */}
            <LoadingScreen msg={conmsg} isLoading={isLoading} setShowLoading={setShowLoading} />
            {!showLoading &&
                <div className="stage">
                    <StageLeftSide />
                    <StageRightSide />
                </div>
            }
        </>
    );
}

export default PlayStage;