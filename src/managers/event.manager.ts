import { Event } from '../types/event.types';
import { EventRepository } from '../repository/event.repository';

export class EventManager {

    private static instance: EventManager | null = null;
    private static eventById: Map<number, Event> = new Map();
    private static readonly repository: EventRepository = new EventRepository();
    
    public static getInstance(): EventManager {

        if(!EventManager.instance) {
            EventManager.instance = new EventManager();
        }

        return EventManager.instance;
    }

    public async findEvent(event: Event): Promise<Event> {
        
        if (EventManager.eventById.has(event.id)) {
            return EventManager.eventById.get(event.id)!;
        }

        return this.saveEvent(event);
    }
    
    private async saveEvent(event: Event): Promise<Event> {
        
        const newEvent: Event = await EventManager.repository.create(event);
        EventManager.eventById.set(newEvent.id, newEvent);
        
        return newEvent; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const events: Event[] = await EventManager.repository.findAll();
        events.map(event => {
            EventManager.eventById.set(event.id, event);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}