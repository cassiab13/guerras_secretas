import { Storie } from './storie.types';
import { Character } from './character.types';
import { Creator } from './creator.types';
import { ComicPrice } from './comic-price.types';
import { ComicDate } from './comic-date.types';
import { Date, Document } from "mongoose";
import { Serie } from './serie.types';
import { Image } from './image.types';
import { Event } from './event.types';
import { ComicText } from './comit-text.types';

export interface Comic extends Document {
    digitalId: number,
    title: string,
    issueNumber: number,
    variantDescription:	string,
    description: string,
    modified: Date,
    isbn: string,
    upc: string,    
    diamondCode: string,
    ean: string,
    issn: string,
    format:	string,
    pageCount: number,
    resourceURI: string,
    serie:	Serie,
    textObjects: ComicText[]
    dates: ComicDate[],
    prices: ComicPrice[],
    thumbnail: Image,
    images: Image[],
    creators: Creator[],
    characters: Character[],
    stories: Storie[],
    events: Event[]
}