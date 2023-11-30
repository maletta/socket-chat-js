import React, { useState, useEffect, useRef } from 'react';
import { IMessageAuthor, IMessages } from 'types/messages-types';
import { messagesMocks } from 'mocks/chatMessagesMock';
import { WebSocketConnection } from './WebSocketConnection';
import { useWebSocket } from './WebSocketWS';

const useChat = () => {
  const [messagesWS, setMessagesWS] = useState<IMessages[]>(messagesMocks);
  const { sendMessageWS } = useWebSocket('ws://localhost:3333');

  const [inputValue, setInputValue] = useState<string>('');
  const refMessageList = useRef<HTMLDivElement | null>(null);
  const currentUser: IMessageAuthor = {
    id: 1,
    name: 'Agente 1',
  };

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

  function sendMessage() {
    if (inputValue.length > 0) {
      setMessagesWS(prev => {
        return [
          ...prev,
          {
            id: Number(prev[prev.length - 1].id) + 1,
            author: currentUser,
            content: inputValue,
            timestamp: new Date().toISOString(),
          },
        ];
      });
      setInputValue('');
    }
  }

  useEffect(() => {
    eventScrollChatToEnd();
  }, [messagesWS]);

  useEffect(() => {

    // const ws = new WebSocketConnection();

    return () => {
      // ws.disconnect();
    }
  }, [])

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
