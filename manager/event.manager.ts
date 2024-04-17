import { Event } from './../types/event.types';
import { EventRepository } from 'repository/event.repository';

export class EventManager {

    private static instance: EventManager | null = null;
    private static uriByObjectId: Map<string, Event> = new Map();
    private static readonly repository: EventRepository = new EventRepository();
    
    public static getInstance(): EventManager {

        if(!EventManager.instance) {
            EventManager.instance = new EventManager();
        }

        return EventManager.instance;
    }

    public static async findCharacter(event: Event): Promise<Event> {
        
        if (EventManager.uriByObjectId.has(event.resourceURI)) {
            return EventManager.uriByObjectId.get(event.resourceURI)!;
        }

        return this.saveEvent(event);
    }
    
    private static async saveEvent(event: Event): Promise<Event> {
        
        const newEvent: Event = await EventManager.repository.create(event);
        EventManager.uriByObjectId.set(newEvent.resourceURI, newEvent);
        
        return newEvent; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const events: Event[] = await EventManager.repository.findAll();
        events.map(event => {
            EventManager.uriByObjectId.set(event.resourceURI, event);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}