import { EventExternal } from "../dto/external/event-external.dto";
import { Event } from "../types/event.types";
import { Adapter } from "./adapter";
import { ImageAdapter } from "./image.adapter";

export class EventAdapter implements Adapter<EventExternal, Event> {

    private imageAdapter: ImageAdapter = new ImageAdapter();

    public async toInternal(external: EventExternal): Promise<Event> {

        const image = await this.imageAdapter.toInternal(external?.thumbnail);
        
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
            creators: external.creators
        };
    }

    public async toInternalSave(external: EventExternal): Promise<Event> {

        const image = await this.imageAdapter.toInternal(external?.thumbnail);
        const modified: Date = new Date(external?.modified); 
        const date: Date | null = isNaN(modified.getTime()) ? null : modified;
        
        return {
            id: external.id,
            title: external.title,
            description: external.description,
            resourceURI: external.resourceURI,
            modified: date,
            start: external.start,
            end: external.end,
            thumbnail: image,
            comics: [],
            stories: [], 
            series: [], 
            characters: [],
            creators: []
        };
    }

}