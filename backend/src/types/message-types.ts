interface IMessages {
    id: string | number;
    content: string;
    timestamp: string;
    author: {
        id: string | number;
        name: string;
    };
}

interface IMessageAuthor {
    id: string | number;
    name: string;
}

export type { IMessages, IMessageAuthor };
