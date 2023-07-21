import {atom} from 'recoil';

export const VideoInfoAtom = atom({
  key: 'VideoInfoAtom',
  default: {
    address:'',
    id:0,
    title:'',
    author:'',
    length:'',
    dj:'',
    isPlaying:false,
    volume:0,
    mute:false,
    elapsed:0
  }
});


