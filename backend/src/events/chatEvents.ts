import { EventsSocketIO } from 'EventsSocketIO';
import { IMessages, IMessageAuthor } from 'types/message-types';

enum EventsTypes {
    NEW_MESSAGE = 'NEW_MESSAGE',
    MESSAGE_TO_CLIENT = 'MESSAGE_TO_CLIENT',
    ENTER_ROOM = 'ENTER_ROOM',
    ON_ENTER_ROOM = 'ON_ENTER_ROOM',
    DISCONNECT_ROOM = 'DISCONNECT_ROOM',
    ROOM_USERS_UPDATE = 'ROOM_USERS_UPDATE',
}

const getRoomId = (data: IMessages): string => {
    return `proposal:${data.roomId}`;
};

const rooms = new Map<number | string, Set<IMessageAuthor>>();

const addUserToRoom = (roomId: number | string, author: IMessageAuthor): Set<IMessageAuthor> => {
    const users: Set<IMessageAuthor> = rooms.get(roomId) || new Set();
    users.add(author);
    rooms.set(roomId, users);

    return users;
};

const chatEvents = new EventsSocketIO<IMessages>();

chatEvents.addEvent(EventsTypes.NEW_MESSAGE, (socket, data) => {
    console.log('EventsTypes.NEW_MESSAGE ', data);
    socket.to(getRoomId(data)).emit(EventsTypes.MESSAGE_TO_CLIENT, data);
});

chatEvents.addEvent(EventsTypes.ENTER_ROOM, (socket, data) => {
    console.log('EventsTypes.ENTER_ROOM ', data);

    // adicionar a sala
    socket.join(getRoomId(data));
    const usersOnRoomId = addUserToRoom(getRoomId(data), data.author);
    // enviar mensagens anteriores
    socket.emit(EventsTypes.ON_ENTER_ROOM, []);

    // enviar contador de usuário na sala
    socket.to(getRoomId(data)).emit(EventsTypes.ROOM_USERS_UPDATE, Array.from(usersOnRoomId));
});

export { chatEvents, EventsTypes };
