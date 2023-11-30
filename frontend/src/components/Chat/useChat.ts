import React, { useState, useEffect, useRef } from 'react';
import { IMessageAuthor, IMessages } from 'types/messages-types';
import { messagesMocks } from 'mocks/chatMessagesMock';
import { useWebSocket } from './useSocketWS';
import useSocketIO from './useSocketIO';

const useChat = () => {
  const [messagesWS, setMessagesWS] = useState<IMessages[]>(messagesMocks);
  const { sendMessageWS } = useWebSocket('ws://localhost:4000');
  const { sendMessageIO } = useSocketIO('ws://localhost:5000');


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

    sendMessageWS(inputValue);

    sendMessageIO({ message: inputValue })

  }

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
