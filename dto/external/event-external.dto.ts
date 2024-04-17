import { CollectionURI } from "./collection-uri.dto";
import { ImageExternal } from "./image-external.dto";
import { SerieSummaryExternal } from "./serie-summary-external.dto";

export interface EventExternal {
    id: number,
    title: string,
    description: string,
    resourceURI: string,
    modified: Date,
    start: Date,
    end: Date,
    thumbnail: ImageExternal,
    comics: CollectionURI,
    stories: CollectionURI,
    series: CollectionURI,
    characters: CollectionURI,
    creators: CollectionURI,
    next: SerieSummaryExternal,
    previous: SerieSummaryExternal
}