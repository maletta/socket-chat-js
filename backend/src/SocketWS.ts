/** USANDO WS */

import express, { Express } from 'express';
import cors from 'cors';
import { createServer, Server as HttpServer } from 'http';
import { Server, WebSocket } from 'ws';

class SocketWS {
  private app: Express;
  private httpServer: HttpServer;
  private wss: Server;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.get("/", (req, res) => {
      console.log("hello http")
    })

    this.httpServer = createServer(this.app);

    this.wss = new Server({ server: this.httpServer });
    this.wss.on('connection', this.onConnection);

    this.wss.on('message', (message: Buffer) => {
      console.log(`Mensagem recebida v1: ${message}`);
      console.log(message.toJSON())
    });

  }

  private onConnection(socket: WebSocket) {
    // ... 
    socket.on("message", (data) => {
      console.log("mensagem recebida WS ", data.toString())
      console.log("mensagem recebida WS ", JSON.parse(data.toString()))
    })
    console.log("conectou ao cliente WS")
  }

  public listen(port: number) {
    console.log("Listen SocketWS on port ", port)
    this.httpServer.listen(port)
  }

}


export { SocketWS }