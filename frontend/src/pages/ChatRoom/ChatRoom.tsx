import React from 'react';

import CR from './styles';
import Chat from 'components/Chat/Chat';

const ChatRoom: React.FC = () => {
  return (
    <CR.ChatRoomContainer>
      <Chat />
    </CR.ChatRoomContainer>
  );
};

export default ChatRoom;
