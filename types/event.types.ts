import { Image } from "./image.types"
import { Comic } from "./comic.types"
import { Storie } from "./storie.types"
import { Serie } from "./serie.types"
import { Character } from "./character.types"
import { Creator } from "./creator.types"
import { SerieSummary } from "./serie-summary.types";
import { ObjectId } from "mongoose"

export interface Event {
    _id: ObjectId | null;
    id: number;
    title: string,
    description: string,
    resourceURI: string,
    modified: Date,
    start: Date,
    end: Date,
    thumbnail:	Image,
    comics: Comic[],
    stories: Storie[],
    series: Serie[],
    characters: Character[]
    creators: Creator[],
    next: SerieSummary | null,
    previous: SerieSummary | null
}