import { SocketIO } from "SocketIO";
import { SocketWS } from "SocketWS";


const wsServer = new SocketWS()
wsServer.listen(4000)

const ioServer = new SocketIO()
ioServer.listen(5000)