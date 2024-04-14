import { Date } from "mongoose";
import { Image } from "./image.types";
import { Serie } from "./serie.types";
import { Comic } from "./comic.types";
import { Storie } from "./storie.types";

export interface Character {
    name: string,
    description: string,
    modified: Date,
    resourceURI: string,
    thumbnail: Image,
    comics: Comic[],
    stories: Storie[],
    events:	Event[],
    series:	Serie[]
}   