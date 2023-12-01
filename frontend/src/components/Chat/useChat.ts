import React, { useState, useEffect, useRef } from 'react';
import { IMessageAuthor, IMessages } from '../../../../backend/src/types/message-types';
import { messagesMocks } from 'mocks/chatMessagesMock';
import { useWebSocket } from './useSocketWS';
import useSocketIO from './useSocketIO';

const useChat = () => {
  if (!sessionStorage.getItem('sessionID')) {
    sessionStorage.setItem('sessionID', new Date().toUTCString());
  }

  const currentUser: IMessageAuthor = {
    id: sessionStorage.getItem('sessionID') as string,
    name: 'Agente Teste',
  };

  const [messagesWS, setMessagesWS] = useState<IMessages[]>([]);
  const { sendMessageWS } = useWebSocket('ws://localhost:4000');
  const { sendMessageIO, newMessageIO } = useSocketIO('ws://localhost:5000', 'chat');

  const [inputValue, setInputValue] = useState<string>('');
  const refMessageList = useRef<HTMLDivElement | null>(null);

  function onChangeInputChat(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget.value);
  }

  function eventScrollChatToEnd() {
    if (refMessageList.current) {
      refMessageList.current.scrollTop = refMessageList.current.scrollHeight;
    }
  }

  function onKeyDownEnterChat(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  function onReceiveChatMessage(newMessage: IMessages) {
    setMessagesWS(prev => {
      return [...prev, newMessage];
    });
  }

  function createMessageId() {
    if (messagesWS.length === 0) {
      return Math.random() * Math.random();
    }

    return Number(messagesWS[messagesWS.length - 1].id) * Math.random();
  }

  function sendMessage() {
    if (inputValue.length > 0) {
      const newMessage: IMessages = {
        id: createMessageId(),
        author: currentUser,
        content: inputValue,
        timestamp: new Date().toISOString(),
      };
      setInputValue('');

      // sendMessageWS(inputValue);
      sendMessageIO(newMessage);

      onReceiveChatMessage(newMessage);
    }
  }

  useEffect(() => {
    if (newMessageIO) {
      onReceiveChatMessage(newMessageIO);
    }
  }, [newMessageIO]);

  useEffect(() => {
    eventScrollChatToEnd();
  }, [messagesWS]);

  return {
    messagesWS,
    refMessageList,
    currentUser,
    inputValue,
    onChangeInputChat,
    onKeyDownEnterChat,
    sendMessage,
  };
};

export { useChat };
