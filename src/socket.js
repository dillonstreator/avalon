import io from 'socket.io-client';

import { store } from './App';
import { actions as roomActions } from './ducks/rooms';
import { actions as userActions } from './ducks/users';
import { actions as gameActions } from './ducks/games';

const WS_URI = process.env['NODE_ENV'] === 'production' ? 'https://avalon-api.honnold.me' : 'localhost:8080';

class WS {
    constructor() {
        this.socket = null;
        this.clientId = null;
    }

    isConnected() { return !!this.socket; }
    
    getSocket() { return this.socket; }
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
        this._dispatchOnEvent('room created', roomActions.addRooms);
        this._dispatchOnEvent('room updated', roomActions.updateRoom);
        this._dispatchOnEvent('room deleted', roomActions.deleteRoom);
        this._dispatchOnEvent('user updated', userActions.updateUser);
        this._dispatchOnEvent('game started', gameActions.addGames);
    };

    _dispatchOnEvent(event, action) {
        socket.addEventListener(event, data => store.dispatch(action(data)));
    }

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