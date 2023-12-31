import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IMessages } from '../../../../../backend/src/Sockets/types/message-types';

enum EventsTypes {
  NEW_MESSAGE = 'NEW_MESSAGE',
  REPLY_NEW_MESSAGE = 'REPLY_NEW_MESSAGE',
  ENTER_ROOM = 'ENTER_ROOM',
  ROOM_USERS_UPDATE = 'ROOM_USERS_UPDATE',
}

const useSocketIO = (url: string, roomId: string | number) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessageIO, setNewMessageIO] = useState<IMessages | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    const socketIo = io(url);
    setSocket(socketIo);

    socketIo.on('connect', () => {
      console.log('conectou ao servidor io');
      socketIo.emit(EventsTypes.ENTER_ROOM, { roomId: roomId, author: { name: 'maletta', id: 1 } });
      setIsSocketConnected(true);
    });

    return () => {
      socketIo.disconnect();
      setIsSocketConnected(false);
    };
  }, [url, roomId]);

  const onEnterRoomIO = (callback: (data: []) => void) => {
    if (socket) {
      socket.on(EventsTypes.ROOM_USERS_UPDATE, message => {
        console.log('ROOM_USERS_UPDATE ', message);
        callback(message);
      });
    }
  };

  const onReceiveMessageIO = (callback: (data: any) => void) => {
    if (socket && isSocketConnected) {
      console.log('add evento ', EventsTypes.REPLY_NEW_MESSAGE);
      socket.on(EventsTypes.REPLY_NEW_MESSAGE, message => {
        console.log('onReceiveMessageIO ', message);
        callback(message);
      });
    }
  };

  const sendMessageIO = (message: object) => {
    if (socket && isSocketConnected) {
      console.log('send message IO ', message);
      socket.emit(EventsTypes.NEW_MESSAGE, message);
    }
  };

  return {
    sendMessageIO,
    newMessageIO,
    isSocketConnected,
    onEnterRoomIO,
    onReceiveMessageIO,
  };
};

export default useSocketIO;
