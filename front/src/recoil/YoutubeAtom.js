import { atom, selector, selectorFamily, useSetRecoilState } from 'recoil';
import YouTube from 'react-youtube';

const opt={
    playerVars:{
        autoplay:1,
        controls:0,
        disablekb:1,
        iv_load_policy:3,
    }
}

// let yt = null;
let ytp;
// let ytp =
//     <YouTube
//         style={{
//             width: '0px',
//             height: '0px',
//             display: 'none'
//         }}
//         onReady={(e) => {
//             yt = e.target;
//         }}
//         opts={opt}
//     />;

export const YTPOptionAtom = atom({
    key:'YTPOptionAtom',
    default:opt,
})

// export const loadVideoById = (videoId, startSeconds) => {
//     ytp.loadVideoById(videoId, startSeconds);
// };

export const IsPlayingAtom = atom({
  key: 'IsPlayingAtom',
  default: false,
});

export const loadVideoById = (videoId, startSeconds) => selector({
    key:'loadVideoByIdAtom',
    get:({get}) => {
        const yt = get(YoutubeAtom);
        console.log(yt);
        yt.loadVideoById(videoId,startSeconds);
        console.log(videoId, startSeconds);
    }
});

export const YoutubeAtom = atom({
    key: 'YoutubeAtom',
    default: null,
    dangerouslyAllowMutability: true
});