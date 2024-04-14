import { CollectionURI } from "./collection-uri.dto";
import { ImageExternal } from "./image-external.dto";

export interface SerieExternal {
    title: string,
    description: string,
    resourceURI: string,
    startYear: number,
    endYear: number,
    rating:	string,
    modified: Date,
    thumbnail: ImageExternal,
    comics: CollectionURI,
    stories: CollectionURI,
    events: CollectionURI,
    characters: CollectionURI,
    creators: CollectionURI,
    next: CollectionURI,
    previous: CollectionURI
}