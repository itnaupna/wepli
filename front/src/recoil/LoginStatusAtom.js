import {atom, selector} from 'recoil';

export const LoginStatusAtom = atom({
    key: 'LoginStatusAtom',
    default: (localStorage.data||sessionStorage.data) != null,
});

export const DataState = atom({
    key: 'DataState',
    default: JSON.parse(sessionStorage.getItem('data')) || JSON.parse(localStorage.getItem('data')) || {},
});

export const emailConfirmState = selector({
    key: 'emailConfirmState',
    get: ({ get }) => {
        const data = get(DataState);
        return JSON.stringify( data.emailconfirm);
    },
});

export const ProfileImageUrl = atom({
   key: 'ProfileImageUrl',
   default: null
});

export const UserStorageNick = atom({
    key: 'UserStorageNick',
    default: null
});

export const UserStorageDesc = atom({
    key: 'UserStorageDesc',
    default: null
})
