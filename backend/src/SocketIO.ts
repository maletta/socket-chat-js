import { EventsSocketIO } from 'EventsSocketIO';
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

    private clientEvents: IClientEvents[];

    constructor() {
        this.app = express();
        this.httpServer = new HttpServer(this.app);
        this.io = new IOServer(this.httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });
        this.clientEvents = [];

        this.io.on('connection', this.onConnection);
    }

    private registerEventsOnSocket(socket: Socket): void {
        console.log('----------------------- register event ------------------');
        this.clientEvents.forEach(item => {
            socket.on(item.eventName, data => {
                console.log('evento ', item.eventName);
                console.log('eventos listados ', socket.eventNames());
                item.handleEvent(socket, data);
            });
        });
    }

    private onConnection(socket: Socket): void {
        console.log('se conectou ao socket IO');
        this.registerEventsOnSocket(socket);
    }

    public AddEvent(events: IClientEvents[]) {
        this.clientEvents.concat(events);
    }

    public listen(port: number = 3333): void {
        console.log('listen SocketIO on port ', port);
        this.httpServer.listen(port);
    }
}

export { SocketIO };

/** USANDO SOCKET IO */

// import { createServer, Server as HttpServer } from "http"
// import { Server, Socket } from "socket.io"

// const httpServer = createServer()

// function socketServer(httpServer: HttpServer) {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "*",
//       methods: ["GET", 'POST']
//     }
//   })

//   io.on("connection", (socket: Socket) => {
//     console.log("conectado ao cliente")
//     socket.on("hello", (msg: any) => {
//       io.emit("hello", msg)
//     })
//   })

// }

// socketServer(httpServer)

// httpServer.listen(3333)
