import { PopulateRepository } from "../repository/populate.repository";
import { Serie } from "../types/serie.types";
import { CharacterManager } from "./character.manager";
import { ComicManager } from "./comic.manager";
import { CreatorManager } from "./creator.manager";
import { EventManager } from "./event.manager";
import { Manager } from "./manager";
import { SerieManager } from "./serie.manager";
import { StorieManager } from "./storie.manager";
import { Populate } from '../types/populate.types';

export class PopulateManager {

    private serieManager: SerieManager = new SerieManager();
    private readonly repository: PopulateRepository = new PopulateRepository();
    private strategies: { [key: string]: Manager } = {
        comics: new ComicManager(),
        creators: new CreatorManager(),
        stories: new StorieManager(),
        characters: new CharacterManager(),
        events: new EventManager()
    };

    public async saveSerie(idSerie: string, updates: any) {
        console.time('Time')
        const serie: Serie = await this.serieManager.save(idSerie);
        await this.updateFieldsBySerie(idSerie, serie, updates);
        console.timeEnd('Time')
    }

    private async updateFieldsBySerie(idSerie: string, serie: Serie, updates: any) {

        let populate: Populate = await this.getPopulate(idSerie);

        for (const key of Object.keys(updates)) {
            if (updates[key] && populate[key as keyof Populate]) {
                populate = { ...populate, [key]: true };
                this.strategies[key].save(serie);
            }
        }

        this.repository.create(populate);
    }

    private async getPopulate(idSerie: string): Promise<Populate> {
        const populate: Populate | null = await this.repository.findByIdSerie(idSerie);

        if (populate) {
            return populate;
        }

        return {
            idSerie: idSerie,
            comics: false,
            characters: false,
            creators: false,
            stories: false,
            events: false
        }
    }

}