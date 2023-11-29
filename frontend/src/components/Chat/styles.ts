import styled, { css } from 'styled-components/macro';

const containerWidth = 500;

const scrollStyled = css`
  scroll-behavior: smooth;

  /* Estilos para a barra de rolagem WebKit Chrome e Safari*/
  ::-webkit-scrollbar {
    width: 8px; /* largura da barra de rolagem */
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* cor de fundo da track */
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; /* cor do handle */
    border-radius: 4px; /* borda arredondada do handle */
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* cor do handle ao passar o mouse por cima */
  }

  /** Estilização para firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

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
  display: flex;
  flex-direction: column;

  padding-right: 8px;
  width: 100%;
  height: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.palette.black.dark};
  padding-bottom: 10px;

  overflow-y: scroll;

  ${scrollStyled}
`;

const ChatMessageItem = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 180px;
  margin-bottom: 8px;

  &.sender {
    align-self: flex-end;
  }

  &.receiver {
    align-self: flex-start;
  }

  p {
    padding: 10px;
    font-size: 1.4rem;
    border-radius: 1rem;
    color: ${({ theme }) => theme.palette.black.dark};
  }

  span {
    font-size: 0%.8rem;
  }

  &.sender {
    p {
      background-image: linear-gradient(to right, #8e2de2, #4a00e0);
    }

    span {
      text-align: end;
    }
  }

  &.receiver {
    p {
      background-image: linear-gradient(25deg, #d64c7f, #ee4758 50%);
    }
  }
`;

const ChatInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;

  width: 100%;
  height: 80px;
  padding: 10px 22px 10px 25px;

  background-color: ${({ theme }) => theme.palette.gray.dark};
`;

const ChatInput = styled.div`
  background-color: white;
`;

const ChatSendButton = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.dark};
`;

export default {
  WaveSVG,
  ChatContainer,
  ChatHeader,
  ChatInput,
  ChatInputContainer,
  ChatMessageContainer,
  ChatMessageList,
  ChatSendButton,
  ChatMessageItem,
};
