import { Serie } from "../types/serie.types";
import { EventAdapter } from "../adapter/event.adapter";
import { EventExternal } from "../dto/external/event-external.dto";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { Event } from "../types/event.types";
import { SaveHandler } from "./save.handler";
import { Request } from "../utils/request.utils";
import { EventCaching } from "../managers/caching/event.caching";
import { CollectionURI } from "../dto/external/collection-uri.dto";

export class SaveEventHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null;
    private eventAdapter: EventAdapter = new EventAdapter();
    private eventCaching: EventCaching = EventCaching.getInstance();
    private toUpdate: any;
    private collectionUri: CollectionURI;

    constructor(toUpdate: any, collectionUri: CollectionURI) {
        this.toUpdate = toUpdate;
        this.collectionUri = collectionUri;
    }

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(): Promise<any> {

        const response: ResponseAPI<EventExternal>[] = await Request.findByCollection(this.collectionUri);
        await this.filterEvents(this.toUpdate, response);

        if (this.nextHandler) {
            return this.nextHandler.save();
        }

        return this.toUpdate;

    }

    private async filterEvents(type: any, response: ResponseAPI<EventExternal>[]): Promise<void> {

        type.events = [];
        const allEvents: EventExternal[] = response.map(response => response.data?.results).flat();
        const sizeEvents: number = allEvents.length;
        
        for (let i = 0; i < sizeEvents; i++) {

            const event: Event = await this.eventAdapter.toInternalSave(allEvents[i]);
            const newEvent: Event = await this.eventCaching.findEvent(event);

            type.events.push(newEvent);
            
        }
    
    }

}