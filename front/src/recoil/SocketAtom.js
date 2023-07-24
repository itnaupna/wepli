import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';
import { ChatItemsAtom } from './ChatItemAtom';

// const [ws, setWs] = useRecoilState();
const sc = new SockJS("https://localhost/ws");
const ws= StompJS.Stomp.over(sc);

let subs;
let sessionId=null;

export const conSocket = () =>{
  // let sock = new SockJS("https://localhost/ws");
  // ws = StompJS.Stomp.over(sock);
  ws.disconnect();  
  ws.connect({},()=>{
    sessionId = sc._transport.url.split("/ws/")[1].split("/")[1];
    console.log("웨오옹" + sessionId);
  });
}

export const subSocket = (endpoint, callback) => {
  subs?.unsubscribe();
  subs = ws.subscribe(endpoint, callback);
}

export const SendMsg = (e) => {
  ws.send("/pub/msg", {}, JSON.stringify(e));
}

export const handleSendMsg = (type, msg, stageId) => {
  msg = msg?.trim();
  let userNick = (JSON.parse(sessionStorage.getItem('data') || localStorage.getItem('data')))?.nick;
  // console.log(userNick);

  if ((type === 'CHAT' && (msg.trim().length === 0 || userNick===undefined))) return;
  SendMsg({
    type,
    stageId,
    userNick,
    sessionId,
    msg
  });

};


export const SocketAtom = atom({
  key: 'SocketAtom',
  default: ws,
  dangerouslyAllowMutability: true
});