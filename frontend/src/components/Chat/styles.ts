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
    /* color: ${({ theme }) => theme.palette.commom.white}; */
    word-wrap: break-word;
  }

  span {
    font-size: 0%.8rem;
  }

  &.sender {
    p {
      background-image: linear-gradient(to right, #8b95f6, #9b8bf4);
    }

    span {
      text-align: end;
    }
  }

  &.receiver {
    p {
      background-image: linear-gradient(25deg, #f8b8d0, #f194b8 50%);
    }
  }
`;

const ChatInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;

  width: 100%;
  height: 80px;
  padding: 10px 22px 10px 25px;

  background-color: ${({ theme }) => theme.palette.gray.dark};
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  background-color: ${({ theme }) => theme.palette.gray.dark};

  input {
    height: 45px;
    width: 100%;
    padding-inline: 10px;
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
    border-bottom: 2px solid transparent;

    :hover {
      border-bottom: 2px solid ${({ theme }) => theme.palette.primary.light};
    }

    :focus {
      border-bottom: 2px solid ${({ theme }) => theme.palette.primary.dark};
    }
  }
`;

const ChatSendButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -3px;
    height: 40px;
    width: 40px;

    img {
      height: 25px;
    }

    /* CSS */
    &.button-50 {
      appearance: button;
      background-color: #000;
      background-image: none;
      border: 1px solid #000;
      border-radius: 4px;
      box-shadow: #fff 4px 4px 0 0, #000 4px 4px 0 1px;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      font-family: ITCAvantGardeStd-Bk, Arial, sans-serif;
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1rem;
      overflow: visible;
      padding: 12px 20px;
      text-align: center;
      text-transform: none;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      vertical-align: middle;
      white-space: nowrap;
    }

    &.button-50:focus {
      text-decoration: none;
    }

    &.button-50:hover {
      text-decoration: none;
    }

    &.button-50:active {
      box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
      outline: 0;
    }

    &.button-50:not([disabled]):active {
      box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
      transform: translate(2px, 2px);
    }

    @media (min-width: 768px) {
      &.button-50 {
        padding: 12px 50px;
      }
    }
  }
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
