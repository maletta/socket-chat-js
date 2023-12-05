import { RoomManager } from 'Sockets/RoomManager';
import { Socket } from 'socket.io';
import { ISocketEvent } from './ISocketEvent';
import { EnumChatEventToClient } from 'Sockets/types/chat-events-types';
import { IMessages } from 'Sockets/types/message-types';

class EnterRoomEvent implements ISocketEvent {
    private roomManager: RoomManager;

    constructor(roomManager: RoomManager) {
        this.roomManager = roomManager;
    }

    handleEvent = (socket: Socket, data: IMessages): void => {
        console.log('EventsTypes.ENTER_ROOM ', data);
        const roomId = String(data.roomId);
        const user = { ...data.author, socketId: socket.id };

        // adicionar a sala
        socket.join(roomId);

        console.log('room manager ', this.roomManager);

        this.roomManager.addUser(roomId, user);

        // enviar mensagens anteriores
        socket.emit(EnumChatEventToClient.ON_ENTER_ROOM, []);

        // enviar contador de usuário na sala
        const roomsCopy = this.roomManager.getRooms();
        console.log('ON_ENTER_ROOM ', roomsCopy, Array.from(roomsCopy.get(roomId)));
        socket.to(roomId).emit(EnumChatEventToClient.ROOM_USERS_UPDATE, Array.from(roomsCopy.get(roomId)));
    };
}

export { EnterRoomEvent };
