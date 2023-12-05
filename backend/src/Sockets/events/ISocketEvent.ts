import { Socket } from 'socket.io';

interface ISocketEvent {
    handleEvent(socket: Socket, data: any): void;
}

export type { ISocketEvent };
