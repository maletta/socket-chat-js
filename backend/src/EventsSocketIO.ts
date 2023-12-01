import { Socket, Server } from 'socket.io';

type IHandleEvent<T> = (socket: Socket, data: T) => void;

interface IEventItem<T> {
    eventName: string;
    handleEvent: IHandleEvent<T>;
}

class EventsSocketIO<T> {
    private _events: IEventItem<T>[];
    private io: Server;

    constructor(ioServer: Server) {
        this.io = ioServer;
        this._events = [];
    }

    public addEvent(eventName: string, handleEvent: IHandleEvent<T>) {
        console.log('eventName ', eventName);
        console.log('data ');
        this._events.push({
            eventName,
            handleEvent,
        });
    }

    get events() {
        return this._events;
    }
}

export { EventsSocketIO };
