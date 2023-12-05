import { SocketIO } from 'SocketIO';
import { SocketWS } from 'SocketWS';
import { ChatEvents } from 'Sockets/ChatEvents';
// import { chatEvents } from 'events/chatEvents';

const wsServer = new SocketWS();
wsServer.listen(4000);

const ioServer = new SocketIO();

ioServer.addEvent(new ChatEvents().events);

ioServer.listen(5000);
