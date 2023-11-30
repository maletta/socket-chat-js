import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

type Callback = (msg: string) => void;

class ChatServer {
  private io: IOServer;

  constructor(httpServer: HttpServer) {
    this.io = new IOServer(httpServer);
  }

  public appendListener(eventName: string, callback: Callback): void {
    this.io.on('connection', (socket: Socket) => {
      console.log("nova conexao ")
      socket.on(eventName, callback);
    });
  }
}


export { ChatServer }