import { Serie } from "../types/serie.types";
import { EventAdapter } from "../adapter/event.adapter";
import { EventExternal } from "../dto/external/event-external.dto";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { Event } from "../types/event.types";
import { SaveHandler } from "./save.handler";
import { Request } from "../utils/external/request.utils";
import { EventManager } from "../manager/event.manager";
import { CollectionURI } from "dto/external/collection-uri.dto";

export class SaveEventHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null;
    private eventAdapter: EventAdapter = new EventAdapter();
    private eventManager: EventManager = EventManager.getInstance();

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(serie: Serie): Promise<Serie> {
        
        const uri: CollectionURI = serie.events as CollectionURI;

        const response: ResponseAPI<EventExternal>[] = await Request.findByCollection(uri);
        await this.filterEvents(serie, response);

        if (this.nextHandler) {
            return this.nextHandler.save(serie);
        }

        return serie;

    }

    private async filterEvents(serie: Serie, response: ResponseAPI<EventExternal>[]): Promise<void> {

        serie.events = [];
        const allEvents: EventExternal[] = response.map(response => response.data.results).flat();
        const sizeEvents: number = allEvents.length;
        
        for (let i = 0; i < sizeEvents; i++) {

            const event: Event = await this.eventAdapter.toInternalSave(allEvents[i]);
            const newEvent: Event = await this.eventManager.findEvent(event);

            serie.events.push(newEvent);
            
        }
    
    }

}