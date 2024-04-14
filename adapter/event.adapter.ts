import { EventExternal } from "../dto/external/event-external.dto";
import { ImageRepository } from "../repository/image.repository";
import { Event } from "../types/event.types";
import { Adapter } from "./adapter";

export class EventAdapter implements Adapter<EventExternal, Event> {

    private imageRepository: ImageRepository = new ImageRepository();

    public async toInternal(external: EventExternal): Promise<Event> {

        const image = await this.imageRepository.create(external.thumbnail);
        
        return {
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