import { CreatorAdapter } from './../adapter/creator.adapter';
import { Creator } from './../types/creator.types';
import { CreatorManager } from './../manager/creator.manager';
import { CollectionURI } from "dto/external/collection-uri.dto";
import { SaveHandler } from "./save.handler";
import { Request } from "../utils/external/request.utils";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { CreatorExternal } from '../dto/external/creator-external.dto';

export class SaveCreatorHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null
    private creatorManager: CreatorManager = CreatorManager.getInstance();
    private creatorAdapter: CreatorAdapter = new CreatorAdapter();
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

        const response: ResponseAPI<CreatorExternal>[] = await Request.findByCollection(this.collectionUri);
        await this.filterCreators(this.toUpdate, response);

        if (this.nextHandler) {
            return this.nextHandler.save();
        }

        return this.toUpdate;

    }

    private async filterCreators(type: any, response: ResponseAPI<CreatorExternal>[]): Promise<void> {

        type.creators = [];
        const allCreators: CreatorExternal[] = response.map(response => response.data?.results).flat();
        const sizeCreators: number = allCreators.length;
        
        for (let i = 0; i < sizeCreators; i++) {

            const creator: Creator = await this.creatorAdapter.toInternalSave(allCreators[i]);
            const newCreator: Creator = await this.creatorManager.findCreator(creator);

            type.creators.push(newCreator);
            
        }
    
    }

}