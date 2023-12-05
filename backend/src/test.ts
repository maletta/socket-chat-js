console.log('test');

interface IMessages {
    id: string | number;
    content: string;
    timestamp: string;
    author: IMessageAuthor;
    roomId: string | number;
}

interface IMessageAuthor {
    id: string | number;
    name: string;
}

type ISocketUser = IMessageAuthor & { socketId: string };

type IRoomsMap = Map<string | number, Set<ISocketUser>>;

const rooms: IRoomsMap = new Map();

const getRoomId = (data: IMessages): string => {
    return `proposal:${data.roomId}`;
};

const author: IMessageAuthor = {
    id: 1,
    name: 'maletta',
};

const message: IMessages = {
    author: author,
    content: 'content 1',
    id: 1,
    roomId: 1,
    timestamp: '123123123123',
};

const message2: IMessages = {
    author: author,
    content: 'content 2',
    id: 2,
    roomId: 2,
    timestamp: '123123123123',
};

const message3: IMessages = {
    author: author,
    content: 'content 3',
    id: 3,
    roomId: 3,
    timestamp: '123123123123',
};

const socketId1 = {
    socketId: '111',
};

const user1: ISocketUser = {
    ...author,
    ...socketId1,
};

const user2: ISocketUser = {
    ...author,
    socketId: '222',
};

const user3: ISocketUser = {
    ...author,
    socketId: '333',
};

function findRoomsBySocketId(socketId: string): string[] {
    let roomIdArray: string[] = [];
    for (const [roomId, users] of rooms) {
        for (const user of users) {
            if (user.socketId === socketId) {
                roomIdArray.push(String(roomId));
            }
        }
    }
    return roomIdArray;
}

const addUserToRoom = (data: IMessages, user: ISocketUser): Set<ISocketUser> => {
    const roomId = getRoomId(data);
    const users: Set<ISocketUser> = rooms.get(roomId) || new Set();
    users.add(user);
    console.log('atual user ', user);
    rooms.set(roomId, users);

    return users;
};

const removeUserFromRoom = (socketId: string): any => {
    const roomsId = findRoomsBySocketId(socketId);

    console.log('old rooms ', rooms);

    roomsId.forEach(roomId => {
        const users: Set<ISocketUser> = rooms.get(roomId);
        for (const user of users) {
            if (user.socketId === socketId) {
                users.delete(user);
            }
        }
        rooms.set(roomId, users);
    });
    console.log('new rooms ', rooms);
};

addUserToRoom(message, user1);
addUserToRoom(message, user2);
addUserToRoom(message, user3);
addUserToRoom(message2, user1);
addUserToRoom(message2, user2);
addUserToRoom(message2, user3);
addUserToRoom(message3, user1);

console.log('add 1 ', rooms);

removeUserFromRoom('111');
