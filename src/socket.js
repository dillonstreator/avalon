import io from 'socket.io-client';

import { store } from './App';
import { actions as roomActions } from './ducks/rooms';

const WS_URI = process.env['NODE_ENV'] === 'production' ? 'http://avalon-api.honnold.me' : 'localhost:8080';

class WS {
    constructor() {
        this.socket = null;
        this.clientId = null;
    }

    isConnected() { return !!this.socket; }
    
    getSocket() { return this.socket; }
    getName() { return this.name; }
    getClientId() { return this.clientId; }

    connect({ token }) {
        if (this.isConnected()) return;

        this.socket = io(`${WS_URI}?token=${token}`);
        this.registerHandlers();
    }
    disconnect() {
        this.socket.disconnect();
        this.socket = null;
    }
    registerHandlers() {
        socket.addEventListener('handshake completed', data => {
            console.log('handshake completed:', data);
            this.clientId = data;
        });
        socket.addEventListener('room created', room => store.dispatch(roomActions.addRoom(room)));
        socket.addEventListener('room updated', room => store.dispatch(roomActions.updateRoom(room)));
        socket.addEventListener('room deleted', room => store.dispatch(roomActions.deleteRoom(room)));
        socket.addEventListener('user updated', user => store.dispatch(roomActions.updateRoomsUser(user)));
        socket.addEventListener('game started', data => {
            console.log('game started', data);
        });
    };

    on(event, handler) {
        const validInputTypes = typeof event === 'string' && typeof handler === 'function';
        if (!validInputTypes) return;

        this.socket.on(event, handler);
    }
    addEventListener(event, handler) {
        const validInputTypes = typeof event === 'string' && typeof handler === 'function';
        if (!validInputTypes) return;

        this.socket.addEventListener(event, handler);
    }
    removeEventListener(event, handler) {
        if (!this.socket) return;
        this.socket.removeEventListener(event, handler);
    }
}

const socket = new WS();

window.MYSOCKET = socket;

export default socket;