import { Serie } from "../types/serie.types";
import { CharacterManager } from "./character.manager";
import { ComicManager } from "./comic.manager";
import { CreatorManager } from "./creator.manager";
import { EventManager } from "./event.manager";
import { Manager } from "./manager";
import { SerieManager } from "./serie.manager";
import { StorieManager } from "./storie.manager";

export class PopulateManager {

    private serieManager: SerieManager = new SerieManager();
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
        await this.updateFieldsBySerie(serie, updates);
        console.timeEnd('Time')
    }

    private async updateFieldsBySerie(serie: Serie, updates: any) {

        for (const key of Object.keys(updates)) {
            if (updates[key]) {
                this.strategies[key].save(serie);
            }
        }
    }

}