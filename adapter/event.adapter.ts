import { EventExternal } from "../dto/external/event-external.dto";
import { Event } from "../types/event.types";
import { Adapter } from "./adapter";
import { ImageService } from "../service/external/image.service";

export class EventAdapter implements Adapter<EventExternal, Event> {

    private imageService: ImageService = new ImageService();

    public async toInternal(external: EventExternal): Promise<Event> {

        const image = await this.imageService.save(external.thumbnail);
        
        return {
            id: external.id,
            title: external.title,
            description: external.description,
            resourceURI: external.resourceURI,
            modified: external.modified,
            start: external.start,
            end: external.end,
            thumbnail: image,
            comics: external.comics,
            stories: external.stories, 
            series: external.series, 
            characters: external.characters,
            creators: external.creators, 
            next: null,
            previous: null
        };
    }

    public async toInternalSave(external: EventExternal): Promise<Event> {

        const image = await this.imageService.save(external.thumbnail);
        
        return {
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