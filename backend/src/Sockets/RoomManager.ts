type IUser = { [key: string]: any } & { socketId: string };
type IRooms = Map<string, Set<IUser>>;

class RoomManager {
    private rooms: IRooms;

    constructor() {
        this.rooms = new Map();
    }

    public addUser(roomId: string, user: IUser): Set<IUser> {
        const users: Set<IUser> = this.rooms.get(roomId) || new Set();
        users.add(user);
        console.log('atual user ', user);
        this.rooms.set(roomId, users);

        return users;
    }

    public removeUser(socketId: string): string[] {
        const roomsId = this.findRoomsIdBySocketId(socketId);

        console.log('old rooms ', this.rooms);

        roomsId.forEach(roomId => {
            const users: Set<IUser> = this.rooms.get(roomId);
            for (const user of users) {
                if (user.socketId === socketId) {
                    users.delete(user);
                }
            }
            this.rooms.set(roomId, users);
        });
        console.log('new rooms ', this.rooms);

        return roomsId;
    }

    public getRooms(): IRooms {
        return this.cloneRooms();
    }

    private findRoomsIdBySocketId(socketId: string): string[] {
        let roomsIdArray: string[] = [];
        for (const [roomId, users] of this.rooms) {
            for (const user of users) {
                if (user.socketId === socketId) {
                    roomsIdArray.push(String(roomId));
                }
            }
        }
        return roomsIdArray;
    }

    private cloneRooms(): IRooms {
        const copy = new Map();
        for (const [roomId, users] of this.rooms) [copy.set(roomId, Array.from(users))];
        return copy;
    }
}

export { RoomManager };
