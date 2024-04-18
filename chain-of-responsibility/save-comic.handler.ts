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

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(serie: Serie): Promise<Serie> {
        
        const uri: CollectionURI = serie.comics as CollectionURI;

        const response: ResponseAPI<ComicExternal>[] = await Request.findByCollection(uri);
        await this.filterComics(serie, response);

        if (this.nextHandler) {
            return this.nextHandler.save(serie);
        }

        return serie;

    }

    private async filterComics(serie: Serie, response: ResponseAPI<ComicExternal>[]): Promise<void> {

        serie.comics = [];
        const allComics: ComicExternal[] = response.map(response => response.data.results).flat();
        const sizeComics: number = allComics.length;
        
        for (let i = 0; i < sizeComics; i++) {

            const comic: Comic = await this.comicAdapter.toInternalSave(allComics[i]);
            const newComic: Comic = await this.comicManager.findComic(comic);

            serie.comics.push(newComic);
            
        }
    
    }

}