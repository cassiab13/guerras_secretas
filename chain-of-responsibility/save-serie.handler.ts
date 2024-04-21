import { CollectionURI } from './../dto/external/collection-uri.dto';
import { Serie } from "../types/serie.types";
import { SaveHandler } from "./save.handler";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { Request } from "../utils/external/request.utils";
import { SerieAdapter } from "../adapter/serie.adapter";
import { SerieExternal } from "dto/external/serie-external.dto";
import { SerieManager } from "../manager/serie.manager";

export class SaveSerieHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null;
    private serieAdapter: SerieAdapter = new SerieAdapter();
    private serieManager: SerieManager = SerieManager.getInstance();
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
        
        const response: ResponseAPI<SerieExternal>[] = await Request.findByCollection(this.collectionUri);
        await this.filterSeries(this.toUpdate, response);

        if (this.nextHandler) {
            return this.nextHandler.save();
        }

        return this.toUpdate;

    }

    private async filterSeries(type: any, response: ResponseAPI<SerieExternal>[]): Promise<void> {

        type.series = [];
        const allSeries: SerieExternal[] = response.map(response => response.data?.results).flat();
        const sizeSeries: number = allSeries.length;
        
        for (let i = 0; i < sizeSeries; i++) {

            const serie: Serie = await this.serieAdapter.toInternalSave(allSeries[i]);
            const newSerie: Serie = await this.serieManager.findSerie(serie);

            type.series.push(newSerie);
            
        }
    
    }

}