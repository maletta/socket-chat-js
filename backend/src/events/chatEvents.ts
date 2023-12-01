import { EventsSocketIO } from 'EventsSocketIO';
import { IMessageAuthor, IMessages } from 'types/message-types';

type IMessageBasic = {
    content: string;
    id: string | number;
};

const chatEvents = new EventsSocketIO<IMessages>();

const getRoomId = (data: IMessages): string => {
    return `proposal:chat`;
};

chatEvents.addEvent('message', (socket, data) => {
    console.log('mensagem rebida ', data);
    console.log('chat id  ', getRoomId(data));
    socket.to(getRoomId(data)).emit('new-message', data);
    console.log('minha salas', socket.rooms);

    // socket.to('proposta-1').emit('new-message', data);
});

chatEvents.addEvent('enter-room', (socket, data) => {
    console.log('entrando na sala ', data);
    socket.join(getRoomId(data));
});

export { chatEvents };
