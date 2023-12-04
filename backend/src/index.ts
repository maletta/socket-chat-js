import { EventsSocketIO } from 'EventsSocketIO';
import { SocketIO } from 'SocketIO';
import { SocketWS } from 'SocketWS';
import { chatEvents } from 'events/chatEvents';

const wsServer = new SocketWS();
wsServer.listen(4000);

const ioServer = new SocketIO();

ioServer.addEvent(chatEvents.events);

ioServer.listen(5000);
