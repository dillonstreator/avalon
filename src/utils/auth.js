import socket from '../socket';

const LS_AVALON_USER = "AVALON_USER";
const LS_AVALON_TOKEN = "AVALON_TOKEN";

const IS_PROD = process.env['NODE_ENV'] === 'production';

const auth = {};

export const authenticated = ({ token, user }) => {
    const stringifiedUser = JSON.stringify({ ...user, password: undefined });
    if (IS_PROD) {
        localStorage.setItem(LS_AVALON_USER, stringifiedUser);
        localStorage.setItem(LS_AVALON_TOKEN, token);
    }
    else {
        auth[LS_AVALON_USER] = user;
        auth[LS_AVALON_TOKEN] = token;
    }
    socket.connect({ token });
    return;
};

export const hasRegistered = () => IS_PROD ? !!localStorage.getItem(LS_AVALON_USER) : false;
export const getToken = () => IS_PROD ? localStorage.getItem(LS_AVALON_TOKEN) : auth[LS_AVALON_TOKEN];
export const getMe = () => IS_PROD ? JSON.parse(localStorage.getItem(LS_AVALON_USER) || '{}') : auth[LS_AVALON_USER];