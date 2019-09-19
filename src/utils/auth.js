import socket from '../socket';

const LS_AVALON_USER = "AVALON_USER";
const LS_AVALON_TOKEN = "AVALON_TOKEN";

export const authenticated = ({ token, user }) => {
    const stringifiedUser = JSON.stringify({ ...user, password: undefined });
    localStorage.setItem(LS_AVALON_USER, stringifiedUser);
    localStorage.setItem(LS_AVALON_TOKEN, token);
    socket.connect({ token });
    return;
};

export const hasRegistered = () => !!localStorage.getItem(LS_AVALON_USER);
export const getToken = () => localStorage.getItem(LS_AVALON_TOKEN);