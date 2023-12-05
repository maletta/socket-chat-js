import { Socket } from 'socket.io';
import { ISocketEvent } from './ISocketEvent';
import { EnumChatEventToClient } from 'Sockets/types/chat-events-types';

class NewMessageEvent implements ISocketEvent {
    handleEvent(socket: Socket, data: IMessages): void {
        console.log('EventsTypes.NEW_MESSAGE ', data);
        const roomId = String(data.roomId);
        socket.to(roomId).emit(EnumChatEventToClient.REPLY_NEW_MESSAGE, data);
        console.log('rooms ', socket.rooms);
    }
}

export { NewMessageEvent };
