import { EventsSocketIO } from 'EventsSocketIO';
import { Socket } from 'socket.io';
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

type ISocketUser = IMessageAuthor & { socketId: string };
const rooms = new Map<number | string, Set<ISocketUser>>();

const addUserToRoom = (data: IMessages, user: ISocketUser): Set<ISocketUser> => {
    const roomId = getRoomId(data);
    const users: Set<ISocketUser> = rooms.get(roomId) || new Set();
    users.add(user);
    console.log('atual user ', user);
    rooms.set(roomId, users);

    return users;
};

const removeUserFromRoom = (socket: Socket): any => {
    const roomId = getRoomId(data);
    const foundUser: Set<ISocketUser> = rooms.get(roomId);
    if (foundUser) {
        foundUser.delete(user);
        rooms.set(roomId, foundUser);
    }

    return { user, foundUser };
};

const chatEvents = new EventsSocketIO<IMessages>();

chatEvents.addEvent(EventsTypes.NEW_MESSAGE, (socket, data) => {
    console.log('EventsTypes.NEW_MESSAGE ', data);
    socket.to(getRoomId(data)).emit(EventsTypes.MESSAGE_TO_CLIENT, data);
    console.log('rooms ', socket.rooms);
});

chatEvents.addEvent(EventsTypes.ENTER_ROOM, (socket, data) => {
    console.log('EventsTypes.ENTER_ROOM ', data);
    const roomId = getRoomId(data);
    // adicionar a sala
    socket.join(getRoomId(data));
    const usersOnRoomId = addUserToRoom(data, { ...data.author, socketId: socket.id });
    // enviar mensagens anteriores
    socket.emit(EventsTypes.ON_ENTER_ROOM, []);

    // enviar contador de usuário na sala
    console.log('ON_ENTER_ROOM ', rooms, Array.from(rooms.get(roomId)));
    socket.to(getRoomId(data)).emit(EventsTypes.ROOM_USERS_UPDATE, Array.from(rooms.get(roomId)));
});

chatEvents.addEvent('disconnect', (socket, data) => {
    console.log('EventsTypes.disconnect ', data);

    const usersOnRoomId = removeUserFromRoom(data, { ...data.author, socketId: socket.id });
    console.log('user to delete ', usersOnRoomId);

    // enviar contador de usuário na sala
    console.log('disconnect ', rooms, Array.from(rooms));
    socket.to(getRoomId(data)).emit(EventsTypes.ROOM_USERS_UPDATE, Array.from(rooms));
});

export { chatEvents, EventsTypes };
