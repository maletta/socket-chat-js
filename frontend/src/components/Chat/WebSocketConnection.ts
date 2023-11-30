import { io, Socket } from 'socket.io-client';

class WebSocketConnection {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000');
    this.socket.on('connect', this.onConnect);
  }

  private onConnect(): void {
    console.log('Conectado ao servidor WebSocket');
    // ...
  }

  public disconnect() {
    this.socket.disconnect()
  }

  public sendMessage(message: object) {
    this.socket.emit("message", message)
  }
}


export { WebSocketConnection }