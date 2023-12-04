import { EventsSocketIO } from 'EventsSocketIO';
import { IMessages } from 'types/message-types';

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

const chatEvents = new EventsSocketIO<IMessages>();

const rooms = new Map<number, Set<IMessages>>();

chatEvents.addEvent(EventsTypes.NEW_MESSAGE, (socket, data) => {
    console.log('EventsTypes.NEW_MESSAGE ', data);
    socket.to(getRoomId(data)).emit(EventsTypes.MESSAGE_TO_CLIENT, data);
});

chatEvents.addEvent(EventsTypes.ENTER_ROOM, (socket, data) => {
    console.log('EventsTypes.ENTER_ROOM ', data);

    // adicionar a sala
    socket.join(getRoomId(data));

    // enviar mensagens anteriores
    socket.emit(EventsTypes.ON_ENTER_ROOM, []);

    // enviar contador de usuário na sala
    socket.to(getRoomId(data)).emit(EventsTypes.ROOM_USERS_UPDATE, []);
});

export { chatEvents, EventsTypes };
