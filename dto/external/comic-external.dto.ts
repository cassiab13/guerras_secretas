import { ComicText } from "types/comit-text.types";
import { SerieSummaryExternal } from "./serie-summary-external.dto";
import { ComicDateExternal } from "./comic-date-external.dto";
import { ComicPrice } from "types/comic-price.types";
import { ImageExternal } from "./image-external.dto";
import { CollectionURI } from "./collection-uri.dto";

export interface ComicExternal {
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
    textObjects: ComicText[],
    series:	SerieSummaryExternal,
    dates: ComicDateExternal[],
    prices: ComicPrice[],
    thumbnail: ImageExternal,
    images: ImageExternal[],
    creators: CollectionURI,
    characters: CollectionURI,
    stories: CollectionURI,
    events: CollectionURI,
}