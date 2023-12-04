import { io, Socket } from 'socket.io-client';
import { SocketIOConnection } from './SocketIOConnection';
import { useEffect, useMemo } from 'react';

const useSocketIoConnection = (url: string) => {
  const socketConnection = useMemo(() => {
    console.log('Criou nova instância de socket io ');
    return new SocketIOConnection(url);
  }, [url]);

  useEffect(() => {
    socketConnection.connect(() => {
      console.log('useSocketIoConnection => Me conectei ');
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [socketConnection]);
};

export { useSocketIoConnection };
