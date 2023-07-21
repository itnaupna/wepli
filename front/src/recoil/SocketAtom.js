import { atom } from 'recoil';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

const ws = StompJS.Stomp.over(new SockJS("https://localhost/ws"));
let subs;
export const subSocket = (endpoint,callback)=>{
  subs?.unsubscribe();
  subs = ws.subscribe(endpoint,callback);
}

// export const connectionState = ()=>ws.connected;

export const SocketAtom = atom({
  key: 'SocketAtom',
  default: ws,
  dangerouslyAllowMutability:true
});