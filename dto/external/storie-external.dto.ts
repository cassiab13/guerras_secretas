import { CollectionURI } from "./collection-uri.dto";
import { ImageExternal } from "./image-external.dto";

export interface StorieExternal {
    title: string,
    description: string,
    resourceURI: string,
    type: string,
    modified: Date,
    thumbnail: ImageExternal,
    comics: CollectionURI,
    series: CollectionURI,
    events: CollectionURI,
    characters: CollectionURI,
    creators: CollectionURI
}