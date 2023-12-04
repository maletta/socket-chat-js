import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IMessages } from '../../../../../backend/src/types/message-types';

enum EventsTypes {
  NEW_MESSAGE = 'NEW_MESSAGE',
  MESSAGE_TO_CLIENT = 'MESSAGE_TO_CLIENT',
  ENTER_ROOM = 'ENTER_ROOM',
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
      socketIo.emit(EventsTypes.ENTER_ROOM, { roomId: roomId });
      setIsSocketConnected(true);
    });

    return () => {
      socketIo.disconnect();
      setIsSocketConnected(false);
    };
  }, [url, roomId]);

  const onEnterRoomIO = (callback: (data: []) => void) => {
    if (socket) {
      socket.on(EventsTypes.MESSAGE_TO_CLIENT, message => {
        console.log('onEnterRoomIO ', message);
        callback(message);
      });
    }
  };

  const onReceiveMessageIO = (callback: (data: any) => void) => {
    if (socket && isSocketConnected) {
      socket.on(EventsTypes.MESSAGE_TO_CLIENT, message => {
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
