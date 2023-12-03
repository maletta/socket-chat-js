import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IMessages } from '../../../../../backend/src/types/message-types';

const useSocketIO = (url: string, chatId: string | number) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessageIO, setNewMessageIO] = useState<IMessages | null>(null);

  useEffect(() => {
    const socketIo = io(url);
    setSocket(socketIo);

    socketIo.on('connect', () => {
      console.log('conectou ao servidor io');
      socketIo.emit('enter-room', { author: { id: chatId } });
    });

    socketIo.on('new-message', message => {
      console.log('nova mensagem recebida ', message);
      setNewMessageIO(message);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [url, chatId]);

  const sendMessageIO = (message: object) => {
    if (socket) {
      console.log('send message IO ', message);
      socket.emit('message', message);
    }
  };

  return {
    sendMessageIO,
    newMessageIO,
  };
};

export default useSocketIO;
