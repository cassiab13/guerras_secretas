import { SerieManager } from './../../manager/serie.manager';
import { SaveEventHandler } from './../../chain-of-responsibility/save-event.handler';
import { UrlExternalUtils } from '../../utils/external/url.utils';
import { ResponseAPI } from '../../dto/external/response-api.dto';
import { Serie } from '../../types/serie.types';
import { Request } from '../../utils/external/request.utils';
import { SerieAdapter } from '../../adapter/serie.adapter';
import { SaveCreatorHandler } from '../../chain-of-responsibility/save-creator.handler';
import { SaveCharacterHandler } from '../../chain-of-responsibility/save-character.handler';
import { SaveComicHandler } from '../../chain-of-responsibility/save-comic.handler';
import { SaveStorieHandler } from '../../chain-of-responsibility/save-storie.handler';

export class ExternalService {

    private readonly serieAdapter: SerieAdapter = new SerieAdapter();
    private serieManager: SerieManager = SerieManager.getInstance(); 

    public async save(id: string): Promise<any> {

        const url = UrlExternalUtils.generateFind("series", id);
        const response: ResponseAPI<Serie> = await Request.findByUrl(url);

        const serie: Serie = await this.serieAdapter.toInternal(response.data.results[0])
        return this.saveSerie(serie);
    }

    private async saveSerie(serie: Serie) {

        const newSerie: Serie = await this.updateSerie(serie);
        this.serieManager.findSerie(newSerie);

    }

    private async updateSerie(serie: Serie): Promise<Serie> {

        const saveCreator: SaveCreatorHandler = new SaveCreatorHandler();
        const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler();
        const saveComic: SaveComicHandler = new SaveComicHandler();
        const saveStorie: SaveStorieHandler = new SaveStorieHandler();
        const saveEvent: SaveEventHandler = new SaveEventHandler();

        saveCreator.setNext(saveCharacter);
        saveCharacter.setNext(saveComic);
        saveComic.setNext(saveStorie);
        saveStorie.setNext(saveEvent);

        return saveCreator.save(serie);

    }
  

}