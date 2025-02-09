import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from './env'
import uuid4 from "uuid4";

export const ws = io(SOCKET_URL)

export const SocketEvents = {
    connect: "connection",
    disconnect: "disconnect",
    connectionError: 'connect_error',
    contentChanged: "content_changed",
    receiveChange: "receive_change",
    joinNote: "join_note",
} as const


export class SocketClient {
    private socket: Socket | null = null;

    connect(serverUrl: string) {
        this.socket = io(serverUrl, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 20000
        });
        this.socket.id = uuid4()

        // Handle connection events
        this.socket.on(SocketEvents.connect, () => {
            console.log('Connected to server');
        });

        this.socket.on(SocketEvents.disconnect, () => {
            console.log('Disconnected from server');
        });

        this.socket.on(SocketEvents.connectionError, (error) => {
            console.error('Connection error:', error);
        });

        return this.socket
    }

    emit(event: string, data: unknown) {
        if (!this.socket) {
            console.error('Socket not initialized');
            return;
        }
        this.socket.emit(event, data);
    }

    on(event: string, callback: (data: unknown) => void) {
        if (!this.socket) {
            console.error('Socket not initialized');
            return;
        }
        this.socket.on(event, callback);
    }

    off(event: string) {
        if (!this.socket) {
            console.error('Socket not initialized');
            return;
        }
        this.socket.off(event);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}