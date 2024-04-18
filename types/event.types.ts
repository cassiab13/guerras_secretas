import { CollectionURI } from "dto/external/collection-uri.dto";
import { Image } from "./image.types"
import { ObjectId } from "mongoose"
import { Storie } from "./storie.types";
import { Serie } from "./serie.types";
import { Character } from "./character.types";
import { Creator } from "./creator.types";
import { Comic } from "./comic.types";

export interface Event {
    _id: ObjectId | null;
    id: number;
    title: string,
    description: string,
    resourceURI: string,
    modified: Date,
    start: Date,
    end: Date,
    thumbnail: Image,
    comics: CollectionURI | Comic[],
    stories: CollectionURI | Storie[],
    series: CollectionURI | Serie[],
    characters: CollectionURI | Character[]
    creators: CollectionURI | Creator[],
    next: any | null,
    previous: any | null
}