import { StorieManager } from "../manager/storie.manager";
import { StorieAdapter } from "../adapter/storie.adapter";
import { Serie } from "../types/serie.types";
import { SaveHandler } from "./save.handler";
import { CollectionURI } from "../dto/external/collection-uri.dto";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { Request } from "../utils/external/request.utils";
import { StorieExternal } from "../dto/external/storie-external.dto";
import { Storie } from "../types/storie.types";

export class SaveStorieHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null;
    private storieAdapter: StorieAdapter = new StorieAdapter();
    private storieManager: StorieManager = StorieManager.getInstance();

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(serie: Serie): Promise<Serie> {
        
        const uri: CollectionURI = serie.stories as CollectionURI;

        const response: ResponseAPI<StorieExternal>[] = await Request.findByCollection(uri);
        await this.filterStories(serie, response);

        if (this.nextHandler) {
            return this.nextHandler.save(serie);
        }

        return serie;

    }

    private async filterStories(serie: Serie, response: ResponseAPI<StorieExternal>[]): Promise<void> {

        serie.stories = [];
        const allStories: StorieExternal[] = response.map(response => response.data.results).flat();
        const sizeStories: number = allStories.length;
        
        for (let i = 0; i < sizeStories; i++) {

            const storie: Storie = await this.storieAdapter.toInternalSave(allStories[i]);
            const newStorie: Storie = await this.storieManager.findStorie(storie);

            serie.stories.push(newStorie);
            
        }
    
    }

}