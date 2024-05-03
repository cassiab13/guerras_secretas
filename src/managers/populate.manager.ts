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
import { CharacterCaching } from "./caching/character.caching";
import { ComicCaching } from "./caching/comic.caching";
import { CreatorCaching } from "./caching/creator.caching";
import { EventCaching } from "./caching/event.caching";
import { SerieCaching } from "./caching/serie.caching";
import { StorieCaching } from "./caching/storie.caching";
import { deleteCacheRedis } from '../../redisConfig';

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
        console.time('Populate');
        const serie: Serie = await this.serieManager.save(idSerie);
        await this.updateFieldsBySerie(idSerie, serie, updates);
        this.clearCache();
        console.timeEnd('Populate');
    }

    private async updateFieldsBySerie(
        idSerie: string,
        serie: Serie,
        updates: any
    ) {
        let populate: any = await this.getPopulate(idSerie);

        for (const key of Object.keys(updates)) {
            if (updates[key] && !populate[key]) {
                populate[key] = true;
                this.strategies[key].save(serie);
            }
        }

        this.repository.create(populate);
    }

    private async getPopulate(idSerie: string): Promise<Populate> {
        const populate: Populate | null = await this.repository.findByIdSerie(
            idSerie
        );

        if (populate) {
            return populate;
        }

        return await this.repository.create({ idSerie: idSerie } as Populate);
    }

    private clearCache(): void {
        CharacterCaching.getInstance().clear();
        ComicCaching.getInstance().clear();
        CreatorCaching.getInstance().clear();
        EventCaching.getInstance().clear();
        SerieCaching.getInstance().clear();
        StorieCaching.getInstance().clear();
        deleteCacheRedis();
    }
}