import {atom, set} from 'recoil';

// 아이디 찾기 모달 오픈
export const SearchSongModalOpen = atom({
    key: 'SearchSongModalOpen',
    default: false,
});

export const NextPageToken = atom({
    key: 'NextPageToken',
    default: null
});
