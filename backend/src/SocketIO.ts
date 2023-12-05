import express, { Express } from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

interface IClientEvents {
    eventName: string;
    handleEvent: (socket: Socket, data: any) => void;
}

class SocketIO {
    private app: Express;
    private httpServer: HttpServer;
    public io: IOServer;

    private clientEvents: IClientEvents[] = [];

    constructor() {
        this.app = express();
        this.httpServer = new HttpServer(this.app);
        this.io = new IOServer(this.httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });

        this.io.on('connection', this.onConnection);
    }

    private registerEventsOnSocket = (socket: Socket): void => {
        this.clientEvents.forEach(item => {
            socket.on(item.eventName, data => {
                console.log('evento ', item.eventName);
                console.log('eventos listados ', socket.eventNames());
                item.handleEvent(socket, data);
            });
        });
    };

    private onConnection = (socket: Socket): void => {
        console.log('se conectou ao socket IO');
        this.registerEventsOnSocket(socket);
    };

    public addEvent(events: IClientEvents[]) {
        this.clientEvents = [...this.clientEvents, ...events];
    }

    public listen(port: number = 3333): void {
        console.log('listen SocketIO on port ', port);
        this.httpServer.listen(port);
    }
}

export { SocketIO };
