// import { IMessages } from 'custom-types';
import { IMessageAuthor, IMessages } from '../../../backend/src/types/message-types';

const author1 = {
  id: 1,
  name: 'Agente 1',
};

const author2 = {
  id: 2,
  name: 'Agente 2',
};

const messagesMocks: IMessages[] = [
  {
    id: 1,
    author: author1,
    content: 'Mensagem',
    timestamp: new Date().toUTCString(),
    roomId: 1,
  },
  {
    id: 2,
    author: author2,
    content: 'Mensagem',
    timestamp: new Date().toUTCString(),
    roomId: 1,
  },
  {
    id: 3,
    author: author2,
    content: 'Mensagem Mensagem Mensagem Mensagem Mensagem Mensagem Mensagem Mensagem',
    timestamp: new Date().toUTCString(),
    roomId: 1,
  },
  {
    id: 4,
    author: author1,
    content: 'Mensagem Mensagem Mensagem Mensagem Mensagem Mensagem Mensagem Mensagem',
    timestamp: new Date().toUTCString(),
    roomId: 1,
  },
];

export { messagesMocks };
