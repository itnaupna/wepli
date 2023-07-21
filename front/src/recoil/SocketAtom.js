import { atom } from 'recoil';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

const ws = StompJS.Stomp.over(new SockJS("https://localhost/ws"));
let subs;
export const subSocket = (endpoint,callback)=>{
  subs?.unsubscribe();
  subs = ws.subscribe(endpoint,callback);
}

export const SendMsg = (e)=>{
  ws.send("/pub/msg", {}, JSON.stringify(e));
}

export const handleSendMsg = (type, msg) => {
  // msg = msg?.trim();
  // let userNick = JSON.parse(sessionStorage.getItem('data') || localStorage.getItem('data'));
  // switch (type) {
  //     case 'ENTER':
  //         break;
  //     case 'EXIT':
  //         break;
  //     case 'SKIP':
  //         break;
  //     case 'VOTE_UP':
  //         break;
  //     case 'VOTE_DOWN':
  //         break;
  //     case 'KICK':
  //         break;
  //     case 'BAN':
  //         break;
  //     case 'DELETE':
  //         break;
  //     case 'QUEUE_IN':
  //         break;
  //     case 'QUEUE_OUT':
  //         break;
  //     case 'QUEUE_ORDER_CHANGE':
  //         break;
  //     case 'QUEUE_ORDER_SONG':
  //         break;
  //     case 'CHAT':
  //         if (msg.trim().length === 0 || !userNick) break;
  //         SendMsg({
  //             type,
  //             stageId: stageUrl,
  //             userNick: userNick?.nick,
  //             msg
  //         });
  //         break;
  //     default:
  //         break;
  // }
};


export const SocketAtom = atom({
  key: 'SocketAtom',
  default: ws,
  dangerouslyAllowMutability:true
});