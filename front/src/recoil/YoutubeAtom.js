import { atom } from 'recoil';
import YouTube from 'react-youtube';

const opt={
    playerVars:{
        autoplay:1,
        controls:0,
        disablekb:1,
        iv_load_policy:3,

    }
}

let yt;
let ytp =
    <YouTube
        style={{
            width: '0px',
            height: '0px',
            display: 'none'
        }}
        onReady={(e) => {
            yt = e.target;
        }}
        opts={opt}
    />;


export const YTPOptionAtom = atom({
    key:'YTPOptionAtom',
    default:opt,
})

export const loadVideoById = (videoId, startSeconds) => {
    yt.loadVideoById(videoId, startSeconds);
};

export const videoStatus = () => {
    console.log(yt);
    console.log(yt.PlayerState);

}

export const YoutubeAtom = atom({
    key: 'YoutubeAtom',
    default: ytp,
    dangerouslyAllowMutability: true
});