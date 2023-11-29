import styled from 'styled-components/macro';

const containerWidth = 500;

const ChatContainer = styled.div`
  width: ${containerWidth}px;
  height: auto;

  
`;

const WaveSVG = styled.svg`
  position: absolute;
  bottom: -1px;
  width: 100%;
  height: auto;

  path {
    fill: ${({ theme }) => theme.palette.primary.main};
  }
`;

const ChatHeader = styled.div`
  width: 100%;
  height: 60px;
  position: relative;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;


`;
const ChatMessageContainer = styled.div`
  height: 300px;
  width: 100%;
  padding: 10px 25px 10px 25px;

  background-color: ${({ theme }) => theme.palette.gray.dark};
  box-shadow: #000 0px 4px 8px -2px, #000 0px 0px 0px 1px;
`;

const ChatMessageList = styled.div`
  width: 100%;
  height: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.palette.black.dark};;

`;

const ChatMessageItem = styled.div`

  background-image: linear-gradient(to right, #8e2de2, #4a00e0);

`;

const ChatInputContainer = styled.div`
  width: 100%;
  height: 80px;

  background-color: ${({ theme }) => theme.palette.gray.dark};;
`;

const ChatInput = styled.div``;

const ChatSendButton = styled.div``;

export default {
  WaveSVG,
  ChatContainer,
  ChatHeader,
  ChatInput,
  ChatInputContainer,
  ChatMessageContainer,
  ChatMessageList,
  ChatSendButton,
  ChatMessageItem
};
