import { Serie } from "types/serie.types";
import { SaveHandler } from "./save.handler";
import { ComicAdapter } from "../adapter/comic.adapter";
import { ComicManager } from "../manager/comic.manager";
import { CollectionURI } from "../dto/external/collection-uri.dto";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { ComicExternal } from "../dto/external/comic-external.dto";
import { Request } from "../utils/external/request.utils";
import { Comic } from "../types/comic.types";

export class SaveComicHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null;
    private comicAdapter: ComicAdapter = new ComicAdapter();
    private comicManager: ComicManager = ComicManager.getInstance();
    private toUpdate: any;
    private collectionUri: CollectionURI;

    constructor(toUpdate: any, collectionUri: CollectionURI) {
        this.toUpdate = toUpdate;
        this.collectionUri = collectionUri;
    }

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(): Promise<any> {

        const response: ResponseAPI<ComicExternal>[] = await Request.findByCollection(this.collectionUri);
        await this.filterComics(this.toUpdate, response);

        if (this.nextHandler) {
            return this.nextHandler.save();
        }

        return this.toUpdate;

    }

    private async filterComics(type: any, response: ResponseAPI<ComicExternal>[]): Promise<void> {


        type.comics = [];
        const allComics: ComicExternal[] = response.map(response => response.data?.results).flat();
        const sizeComics: number = allComics.length;
        
        for (let i = 0; i < sizeComics; i++) {

            const comic: Comic = await this.comicAdapter.toInternalSave(allComics[i]);
            const newComic: Comic = await this.comicManager.findComic(comic);

            type.comics.push(newComic);
            
        }
    
    }

}