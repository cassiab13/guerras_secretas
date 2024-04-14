import { EventAdapter } from "../adapter/event.adapter";
import { EventExternal } from "../dto/external/event-external.dto";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { EventRepository } from "../repository/event.repository";
import { Event } from "../types/event.types";
import { RequestExternalUtils } from "../utils/external/request.utils";
import { SaveHandler } from "./save.handler";

export class SaveEventHandler implements SaveHandler {

    private adapter: EventAdapter = new EventAdapter();
    private repository: EventRepository = new EventRepository();
    private nextHandler: SaveHandler | null = null

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(url: string): Promise<void> {
        
        const response: ResponseAPI<EventExternal> = await RequestExternalUtils.find({ available: 0, collectionURI: url })
        const eventExternal: EventExternal = response.data.results[0];
        
        const event: Event = await this.adapter.toInternal(eventExternal);
        this.repository.create(event);

        if (this.nextHandler) {
            this.nextHandler.save(eventExternal.creators.collectionURI);
        }
        
    }

}