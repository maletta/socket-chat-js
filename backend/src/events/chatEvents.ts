import { EventsSocketIO } from 'EventsSocketIO';
import { IMessages } from 'types/message-types';

enum EventsTypes {
    NEW_MESSAGE = 'NEW_MESSAGE',
    MESSAGE_TO_CLIENT = 'MESSAGE_TO_CLIENT',
    ENTER_ROOM = 'ENTER_ROOM',
}

const getRoomId = (data: IMessages): string => {
    return `proposal:${data.roomId}`;
};

const chatEvents = new EventsSocketIO<IMessages>();

chatEvents.addEvent(EventsTypes.NEW_MESSAGE, (socket, data) => {
    console.log('EventsTypes.NEW_MESSAGE ', data);
    socket.to(getRoomId(data)).emit(EventsTypes.MESSAGE_TO_CLIENT, data);
});

chatEvents.addEvent(EventsTypes.ENTER_ROOM, (socket, data) => {
    console.log('EventsTypes.ENTER_ROOM ', data);
    socket.join(getRoomId(data));
});

export { chatEvents, EventsTypes };
