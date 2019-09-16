import io from 'socket.io-client';

const WS_URI = process.env['BASE_URI'] || 'localhost:8080';

class WS {
    constructor() {
        this.socket = null;
        this.clientId = null;
        this.name = null;
    }

    isConnected() { return !!this.socket; }
    
    getSocket() { return this.socket; }
    getName() { return this.name; }
    getClientId() { return this.clientId; }

    connect({ name }) {
        if (this.isConnected()) return;

        this.name = name;
        this.socket = io(`${WS_URI}?name=${name}`);
        this.registerHandlers();
    }
    registerHandlers() {
        socket.addEventListener('handshake completed', data => {
            console.log('handshake completed:', data);
            this.clientId = data;
        });
        socket.addEventListener('room created', data => {
            console.log('room created', data);
        });
        socket.addEventListener('room deleted', data => {
            console.log('room deleted', data);
        });
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
        this.socket.removeEventListener(event, handler);
    }
}

const socket = new WS();

window.MYSOCKET = socket;

export default socket;