import { SaveEventHandler } from './../../chain-of-responsibility/save-event.handler';
import { UrlExternalUtils } from '../../utils/external/url.utils';
import { ResponseAPI } from '../../dto/external/response-api.dto';
import { Serie } from '../../types/serie.types';
import { Request } from '../../utils/external/request.utils';
import { SerieManager } from '../../manager/serie.manager';
import { SerieAdapter } from '../../adapter/serie.adapter';
import { SaveCreatorHandler } from '../../chain-of-responsibility/save-creator.handler';
import { SaveCharacterHandler } from '../../chain-of-responsibility/save-character.handler';
import { SaveComicHandler } from '../../chain-of-responsibility/save-comic.handler';
import { SaveStorieHandler } from '../../chain-of-responsibility/save-storie.handler';

export class ExternalService {

    private readonly serieAdapter: SerieAdapter = new SerieAdapter();

    public async save(id: string): Promise<any> {

      const serieManager: SerieManager = SerieManager.getInstance();

      const url = UrlExternalUtils.generateFind("series", id);
      const response: ResponseAPI<Serie> = await Request.findByUrl(url);

      const serie: Serie = await this.serieAdapter.toInternal(response.data.results[0])

    }

    private async saveSerie(serie: Serie) {

    }

    private async updateSerie(serie: Serie) {
        const saveCreator: SaveCreatorHandler = new SaveCreatorHandler();
        const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler();
        const saveComic: SaveComicHandler = new SaveComicHandler();
        const saveStorie: SaveStorieHandler = new SaveStorieHandler();
        const saveEventHandler: SaveEventHandler = new SaveEventHandler();




    }
  

}