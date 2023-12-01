import React, { useState, useEffect, useRef } from 'react';
import { IMessageAuthor, IMessages } from '../../../../backend/src/types/message-types';
import { messagesMocks } from 'mocks/chatMessagesMock';
import { useWebSocket } from './useSocketWS';
import useSocketIO from './useSocketIO';

const useChat = () => {
  const [messagesWS, setMessagesWS] = useState<IMessages[]>(messagesMocks);
  const { sendMessageWS } = useWebSocket('ws://localhost:4000');
  const { sendMessageIO } = useSocketIO('ws://localhost:5000', 1);

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
      const newMessage: IMessages = {
        id: Number(messagesWS[messagesWS.length - 1].id) + 1,
        author: currentUser,
        content: inputValue,
        timestamp: new Date().toISOString(),
      };

      setInputValue('');
      sendMessageWS(inputValue);
      sendMessageIO(newMessage);
    }
  }

  function onReceiveChatMessage(newMessage: IMessages) {
    setMessagesWS(prev => {
      return [...prev, newMessage];
    });
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
