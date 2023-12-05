enum EnumChatEventFromClient {
    // mensagem do cliente
    NEW_MESSAGE = 'NEW_MESSAGE',
    ENTER_ROOM = 'ENTER_ROOM',
    DISCONNECT_ROOM = 'disconnect',
}

enum EnumChatEventToClient {
    // mensagem para o cliente
    REPLY_NEW_MESSAGE = 'REPLY_NEW_MESSAGE',
    ON_ENTER_ROOM = 'ON_ENTER_ROOM',
    ROOM_USERS_UPDATE = 'ROOM_USERS_UPDATE',
}

export { EnumChatEventFromClient, EnumChatEventToClient };
