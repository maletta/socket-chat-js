import { ChatServer } from './ChatServer';
import express, { Express } from 'express';
import { Server as HttpServer } from 'http';
import cors from "cors";

class ServerApp {

  public app: Express;
  private httpServer: HttpServer;

  public chatServer: ChatServer;


  constructor() {
    this.app = express();

    this.app.use(cors({ origin: "*" }))
    this.httpServer = new HttpServer(this.app);
    this.chatServer = new ChatServer(this.httpServer);
  }

  public listen(port: number = 3000): void {
    this.httpServer.listen(port, () => {
      console.log(`Servidor ouvindo na porta ${port}`);
    });
  }

}

export { ServerApp }

// chatServer.listen(3000);