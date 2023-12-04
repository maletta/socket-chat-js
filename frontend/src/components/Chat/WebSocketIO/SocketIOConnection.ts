import { io, Socket } from 'socket.io-client';

enum EventsTypes {
  NEW_MESSAGE = 'NEW_MESSAGE',
  MESSAGE_TO_CLIENT = 'MESSAGE_TO_CLIENT',
  ENTER_ROOM = 'ENTER_ROOM',
}

class SocketIOConnection {
  private connection: Socket;

  constructor(url: string) {
    this.connection = io(url);
  }

  public joinRoom(roomId: string | number) {
    this.connection.emit(EventsTypes.ENTER_ROOM, roomId);
  }

  public addEvent(eventName: string, callback: (...args: any) => void) {
    this.connection.on(eventName, callback);
  }

  public disconect() {
    this.connection.disconnect();
  }
}

export { SocketIOConnection };
