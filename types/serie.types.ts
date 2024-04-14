import { Date, Document } from "mongoose";
import { Image } from "./image.types";
import { Comic } from "./comic.types";
import { Storie } from "./storie.types";
import { Character } from "./character.types";
import { Creator } from "./creator.types";
import { SerieSummary } from "./serie-summary.tpes";
import { Event } from "./event.types";

export interface Serie extends Document {
    title: string,
    description: string,
    resourceURI: string,
    startYear: number,
    endYear: number,
    rating:	string,
    modified: Date,
    thumbnail: Image,
    comics: Comic[],
    stories: Storie[],
    events: Event[],
    characters: Character[],
    creators: Creator[],
    next: SerieSummary,
    previous: SerieSummary
}