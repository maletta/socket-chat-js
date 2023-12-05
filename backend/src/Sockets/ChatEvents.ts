import { EventsSocketIO } from './EventsSocketIO';
import { RoomManager } from './RoomManager';
import { DisconnectEvent } from './events/DisconnectEvent';
import { EnterRoomEvent } from './events/EnterRoomEvent';
import { NewMessageEvent } from './events/NewMessageEvent';
import { EnumChatEventFromClient } from './types/chat-events-types';
import { IMessages } from './types/message-types';

class ChatEvents {
    private chatEvents: EventsSocketIO<IMessages>;
    private rooms: RoomManager;

    constructor() {
        this.chatEvents = new EventsSocketIO<IMessages>();
        this.rooms = new RoomManager();
        this.initializeEvents();
    }

    private initializeEvents(): void {
        console.log('initializeEvents ROOMS ', this.rooms);

        this.chatEvents.addEvent(EnumChatEventFromClient.NEW_MESSAGE, new NewMessageEvent().handleEvent);

        this.chatEvents.addEvent(EnumChatEventFromClient.ENTER_ROOM, new EnterRoomEvent(this.rooms).handleEvent);

        this.chatEvents.addEvent(EnumChatEventFromClient.DISCONNECT_ROOM, new DisconnectEvent(this.rooms).handleEvent);
    }

    get events() {
        return this.chatEvents.events;
    }
}

export { ChatEvents };
