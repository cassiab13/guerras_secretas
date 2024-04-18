import { Serie } from "types/serie.types";
import { EventAdapter } from "../adapter/event.adapter";
import { EventExternal } from "../dto/external/event-external.dto";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { EventRepository } from "../repository/event.repository";
import { Event } from "../types/event.types";
import { SaveHandler } from "./save.handler";
import { Request } from "utils/external/request.utils";

export class SaveEventHandler implements SaveHandler {

    private adapter: EventAdapter = new EventAdapter();
    private repository: EventRepository = new EventRepository();
    private nextHandler: SaveHandler | null = null;

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(serie: Serie): Promise<Serie> {
        

        if (this.nextHandler) {
            return this.nextHandler.save(serie);
        }

        return serie;
        
    }

}