import { Comic } from "src/types/comic.types";
import { CollectionURI } from "./collection-uri.dto";
import { ImageExternal } from "./image-external.dto";
import { Storie } from "src/types/storie.types";
import { Serie } from "src/types/serie.types";
import { Character } from "src/types/character.types";
import { Creator } from "src/types/creator.types";

export interface EventExternal {
    id: number,
    title: string,
    description: string,
    resourceURI: string,
    modified: Date,
    start: Date,
    end: Date,
    thumbnail: ImageExternal,
    comics: CollectionURI | Comic[],
    stories: CollectionURI | Storie[],
    series: CollectionURI | Serie[],
    characters: CollectionURI | Character[],
    creators: CollectionURI | Creator[]
}