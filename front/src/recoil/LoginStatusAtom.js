import {atom, selector} from 'recoil';

export const LoginStatusAtom = atom({
    key: 'LoginStatusAtom',
    default: (localStorage.data||sessionStorage.data) != null,
});

export const dataState = atom({
    key: 'dataState',
    default: JSON.parse(sessionStorage.getItem('data')) || JSON.parse(localStorage.getItem('data')) || {},
});

export const emailConfirmState = selector({
    key: 'emailConfirmState',
    get: ({ get }) => {
        const data = get(dataState);
        return data.emailconfirm;
    },
});

export const ProfileImageUrl = atom({
   key: 'ProfileImageUrl',
   default: null
});