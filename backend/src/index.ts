import { EventsSocketIO } from 'EventsSocketIO';
import { SocketIO } from 'SocketIO';
import { SocketWS } from 'SocketWS';

const wsServer = new SocketWS();
wsServer.listen(4000);

const ioServer = new SocketIO();

const chatEvents = new EventsSocketIO<{ message: string }>(ioServer.io);

chatEvents.addEvent('messages', (socket, data) => {
    console.log('mensagem rebida ', data.message);
});

ioServer.AddEvent(chatEvents.events);

ioServer.listen(5000);
