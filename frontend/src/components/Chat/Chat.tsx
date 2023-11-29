import React from 'react';

import CHS from './styles';

const Chat: React.FC = () => {
  return (
    <CHS.ChatContainer>
      <CHS.ChatHeader>
        <CHS.WaveSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,122.7C672,128,768,160,864,176C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </CHS.WaveSVG>
      </CHS.ChatHeader>
      <CHS.ChatMessageContainer>
        <CHS.ChatMessageList></CHS.ChatMessageList>
      </CHS.ChatMessageContainer>
      <CHS.ChatInputContainer>
        <CHS.ChatInput />
        <CHS.ChatSendButton />
      </CHS.ChatInputContainer>
    </CHS.ChatContainer>
  );
};

export default Chat;
