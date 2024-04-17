import { EventExternal } from "../dto/external/event-external.dto";
import { ImageRepository } from "../repository/image.repository";
import { Event } from "../types/event.types";
import { Adapter } from "./adapter";
import { ImageAdapter } from "./image.adapter";

export class EventAdapter implements Adapter<EventExternal, Event> {

    private imageAdapter: ImageAdapter = new ImageAdapter();

    public async toInternal(external: EventExternal): Promise<Event> {

        const image = await this.imageAdapter.toInternal(external.thumbnail);
        
        return {
            _id: null,
            id: external.id,
            title: external.title,
            description: external.description,
            resourceURI: external.resourceURI,
            modified: external.modified,
            start: external.start,
            end: external.end,
            thumbnail: image,
            comics: [],
            stories: [], 
            series: [], 
            characters: [],
            creators: [], 
            next: null,
            previous: null
        };
    }

}