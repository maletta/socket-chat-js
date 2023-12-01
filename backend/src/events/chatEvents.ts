import { EventsSocketIO } from 'EventsSocketIO';
import { IMessageAuthor, IMessages } from 'types/message-types';

type IMessageBasic = {
    content: string;
    id: string | number;
};

const chatEvents = new EventsSocketIO<IMessages>();

const getRoomId = (data: IMessages): string => {
    return `proposal:${data.id}`;
};

chatEvents.addEvent('message', (socket, data) => {
    console.log('mensagem rebida ', data);
    socket.to(getRoomId(data)).emit('room-message', data);
});

chatEvents.addEvent('enter-room', (socket, data) => {
    console.log('entrando na sala ', data);
    socket.join(getRoomId(data));
});

export { chatEvents };
