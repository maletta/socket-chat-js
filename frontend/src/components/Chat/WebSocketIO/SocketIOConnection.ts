import { io, Socket } from 'socket.io-client';

enum EventsTypes {
  NEW_MESSAGE = 'NEW_MESSAGE',
  MESSAGE_TO_CLIENT = 'MESSAGE_TO_CLIENT',
  ENTER_ROOM = 'ENTER_ROOM',
}

interface IClientEvents {
  eventName: string;
  handleEvent: (socket: Socket, data: any) => void;
}

class SocketIOConnection<T> {
  private connection: Socket | null;
  private connectionUrl: string;

  private clientEvents: IClientEvents[] = [];

  constructor(url: string) {
    this.connectionUrl = url;
    this.connection = null;

    this.registerEventsOnSocket();
  }

  public connect(callback: (data: any) => void) {
    this.connection = io(this.connectionUrl);
    this.connection.on('connection', callback);
  }

  public disconnect() {
    if (this.connection) {
      this.connection.disconnect();
    }
  }

  public joinRoom(roomId: string | number) {
    if (this.connection) {
      this.connection.emit(EventsTypes.ENTER_ROOM, roomId);
    }
  }

  private registerEventsOnSocket() {
    if (this.connection) {
      this.clientEvents.forEach(clientEvent => {
        this.connection?.on(clientEvent.eventName, clientEvent.handleEvent);
      });
    }
  }

  public addEvent(events: IClientEvents[]) {
    this.clientEvents = [...this.clientEvents, ...events];
  }
}

export { SocketIOConnection };
