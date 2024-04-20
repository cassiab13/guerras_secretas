import { Comic } from 'types/comic.types';
import { ComicManager } from './../../manager/comic.manager';
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
import { CollectionURI } from '../../dto/external/collection-uri.dto';
import { ComicExternal } from '../../dto/external/comic-external.dto';
import { ComicAdapter } from '../../adapter/comic.adapter';
import { ComicRepository } from '../../repository/comic.repository';

export class ExternalService {

    private readonly serieAdapter: SerieAdapter = new SerieAdapter();
    private readonly serieManager: SerieManager = SerieManager.getInstance();

    private readonly comicAdapter: ComicAdapter = new ComicAdapter();
    private readonly comicManager: ComicManager = ComicManager.getInstance();
    private comicRepository: ComicRepository = new ComicRepository();

    public async save(id: string): Promise<any> {

        const url = UrlExternalUtils.generateFind("series", id);
        const response: ResponseAPI<Serie> = await Request.findByUrl(url);

        const serie: Serie = await this.serieAdapter.toInternal(response.data.results[0])
        return this.saveSerie(serie, response);
    }

    private async saveSerie(serie: Serie, response: ResponseAPI<Serie>) {

        const newSerie: Serie = await this.updateSerie(serie);
        await this.serieManager.findSerie(newSerie);

        this.updateComicsBySerie(response.data.results[0]);
    }

    private async updateSerie(serie: Serie): Promise<Serie> {

        const saveCreator: SaveCreatorHandler = new SaveCreatorHandler(serie, serie.creators as CollectionURI);
        const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler(serie, serie.characters as CollectionURI);
        const saveComic: SaveComicHandler = new SaveComicHandler(serie, serie.comics as CollectionURI);
        const saveStorie: SaveStorieHandler = new SaveStorieHandler(serie, serie.stories as CollectionURI);
        const saveEvent: SaveEventHandler = new SaveEventHandler(serie, serie.events as CollectionURI);

        saveCreator.setNext(saveCharacter);
        saveCharacter.setNext(saveComic);
        saveComic.setNext(saveStorie);
        saveStorie.setNext(saveEvent);

        return saveCreator.save();

    }
    
    private async updateComicsBySerie(serie: Serie) {

        const response: ResponseAPI<ComicExternal>[] = await Request.findByCollection(serie.comics as CollectionURI);
        const allComics: ComicExternal[] = response.map(response => response.data.results).flat();
        const sizeComics: number = allComics.length;

        const newComics: Comic[] = [];

        for(let i = 0; i < sizeComics; i++) {

            const comic: Comic = await this.comicAdapter.toInternalSave(allComics[i]);
            const newComic: Comic = await this.comicManager.findComic(comic);
            
            const saveCreator: SaveCreatorHandler = new SaveCreatorHandler(newComic, allComics[i].creators as CollectionURI);
            const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler(newComic, allComics[i].characters as CollectionURI);
            const saveStorie: SaveStorieHandler = new SaveStorieHandler(newComic, allComics[i].stories as CollectionURI);
            const saveEvent: SaveEventHandler = new SaveEventHandler(newComic, allComics[i].events as CollectionURI);

            saveCreator.setNext(saveCharacter);
            saveCharacter.setNext(saveStorie);
            saveStorie.setNext(saveEvent);

            await saveCreator.save();
            newComics.push(newComic);

        }

        this.comicRepository.updateMany(newComics);
        console.log(newComics);
    }

}