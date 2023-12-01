import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocketIO = (url: string, chatId: string | number) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(url);
    setSocket(socketIo);

    socketIo.on('connect', () => {
      console.log('conectou ao servidor io');
      socketIo.emit('enter-room', { id: chatId });
    });

    socketIo.on('room-message', data => {
      console.log('mensagem recebida ', data);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [url, chatId]);

  const sendMessageIO = (message: object) => {
    if (socket) {
      socket.emit('message', message);
    }
  };

  return { sendMessageIO };
};

export default useSocketIO;
