import { RoomManager } from 'Sockets/RoomManager';
import { Socket } from 'socket.io';
import { ISocketEvent } from './ISocketEvent';
import { EnumChatEventToClient } from 'Sockets/types/chat-events-types';

class DisconnectEvent implements ISocketEvent {
    private roomManager: RoomManager;

    constructor(roomManager: RoomManager) {
        this.roomManager = roomManager;
    }

    handleEvent = (socket: Socket): void => {
        console.log('EventsTypes.disconnect ');

        const roomsWithRemovedId = this.roomManager.removeUser(socket.id);

        // enviar contador de usuário na sala
        roomsWithRemovedId.forEach(roomId => {
            const currentUsersOnline = this.roomManager.getRooms().get(roomId);
            socket.to(roomId).emit(EnumChatEventToClient.ROOM_USERS_UPDATE, Array.from(currentUsersOnline));
        });
    };
}

export { DisconnectEvent };
