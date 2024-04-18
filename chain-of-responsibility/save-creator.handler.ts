import { CreatorAdapter } from './../adapter/creator.adapter';
import { Creator } from './../types/creator.types';
import { CreatorManager } from './../manager/creator.manager';
import { CollectionURI } from "dto/external/collection-uri.dto";
import { SaveHandler } from "./save.handler";
import { Serie } from "types/serie.types";
import { Request } from "../utils/external/request.utils";
import { ResponseAPI } from "dto/external/response-api.dto";
import { CreatorExternal } from 'dto/external/creator-external.dto';

export class SaveCreatorHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null
    private creatorManager: CreatorManager = CreatorManager.getInstance();
    private creatorAdapter: CreatorAdapter = new CreatorAdapter();

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(serie: Serie): Promise<Serie> {
        
        const uri: CollectionURI = serie.creators as CollectionURI;

        const response: ResponseAPI<CreatorExternal>[] = await Request.findByCollection(uri);
        await this.filterCreators(serie, response);

        if (this.nextHandler) {
            return this.nextHandler.save(serie);
        }

        return serie;

    }

    private async filterCreators(serie: Serie, response: ResponseAPI<CreatorExternal>[]): Promise<void> {

        serie.creators = [];
        const allCreators: CreatorExternal[] = response.map(response => response.data.results).flat();
        const sizeCreators: number = allCreators.length;
        
        for (let i = 0; i < sizeCreators; i++) {

            const creator: Creator = await this.creatorAdapter.toInternalSave(allCreators[i]);
            const newCreator: Creator = await this.creatorManager.findCreator(creator);

            serie.creators.push(newCreator);
            
        }
    
    }

}