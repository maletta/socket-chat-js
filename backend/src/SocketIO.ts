import express, { Express } from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

class SocketIO {
  private app: Express;
  private httpServer: HttpServer;
  private io: IOServer;

  constructor() {
    this.app = express();
    this.httpServer = new HttpServer(this.app);
    this.io = new IOServer(this.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    this.io.on('connection', this.onConnection);
  }

  private onConnection(socket: Socket): void {
    console.log("se conectou ao socket IO")

    socket.on("message", (data) => {
      console.log("mensagem recebida IO", data)
    })
  }

  public listen(port: number = 3333): void {
    console.log("listen SocketIO on port ", port)
    this.httpServer.listen(port);
  }
}

export { SocketIO }



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



