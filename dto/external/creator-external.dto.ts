import { CollectionURI } from "./collection-uri.dto";
import { ImageExternal } from "./image-external.dto";

export interface CreatorExternal {
    firstName: string,
    middleName: string,
    lastName: string,
    suffix:	string,
    fullName: string,
    role: string,
    modified: Date,
    resourceURI: string,
    thumbnail: ImageExternal,
    series: CollectionURI,
    stories: CollectionURI,
    comics: CollectionURI,
    events: CollectionURI
}