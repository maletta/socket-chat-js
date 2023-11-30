import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocketIO = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(url);

    socketIo.on('connect', () => {
      console.log('conectou ao servidor io');
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  const sendMessageIO = (message: object) => {
    if (socket) {
      socket.emit('message', message);
    }
  };

  return { sendMessageIO };
};

export default useSocketIO;