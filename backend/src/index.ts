// import express, { Express } from 'express';
// import { Server as HttpServer } from 'http';
// import { Server as IOServer, Socket } from 'socket.io';

// class Server {
//   private app: Express;
//   private server: HttpServer;
//   private io: IOServer;

//   constructor() {
//     this.app = express();
//     this.server = new HttpServer(this.app);
//     this.io = new IOServer(this.server);
//     this.io.on('connection', this.onConnection);
//   }

//   private onConnection(socket: Socket): void {
//     console.log("se conectou ao socket")
//   }

//   public listen(port: number = 3333): void {
//     console.log("listen on port ", port)
//     this.server.listen(port);
//   }
// }

// const server = new Server();
// server.listen();


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


/** USANDO WS */

import express, { Express } from 'express';
import cors from 'cors';
import { createServer, Server as HttpServer } from 'http';
import { Server, WebSocket } from 'ws';
import { isWhileStatement } from 'typescript';

class WebSocketServer {
  private app: Express;
  private httpServer: HttpServer;
  private wss: Server;

  constructor(port: number) {
    this.app = express();
    this.app.use(cors());

    this.httpServer = createServer(this.app);

    this.wss = new Server({ server: this.httpServer });
    this.wss.on('connection', this.onConnection);

    this.wss.on('message', (message) => {
      console.log(`Mensagem recebida: ${message}`);
    });




    this.httpServer.listen(port);
  }

  private onConnection(socket: WebSocket) {
    // ... 
    socket.on("message", (data) => {
      console.log("mensagem recebida ", data)
    })
    console.log("conectou ao cliente WS")
  }

}

const server = new WebSocketServer(3333);