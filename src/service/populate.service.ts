import { CharacterRepository } from '../repository/character.repository';
import { Comic } from 'src/types/comic.types';
import { ComicManager } from '../managers/comic.manager';
import { SerieManager } from '../managers/serie.manager';
import { SaveEventHandler } from '../handlers/save-event.handler';
import { UrlExternalUtils } from '../utils/url.utils';
import { ResponseAPI } from '../dto/external/response-api.dto';
import { Serie } from '../types/serie.types';
import { Request } from '../utils/request.utils';
import { SerieAdapter } from '../adapter/serie.adapter';
import { SaveCreatorHandler } from '../handlers/save-creator.handler';
import { SaveCharacterHandler } from '../handlers/save-character.handler';
import { SaveComicHandler } from '../handlers/save-comic.handler';
import { SaveStorieHandler } from '../handlers/save-storie.handler';
import { CollectionURI } from '../dto/external/collection-uri.dto';
import { ComicExternal } from '../dto/external/comic-external.dto';
import { ComicAdapter } from '../adapter/comic.adapter';
import { ComicRepository } from '../repository/comic.repository';
import { SerieExternal } from '../dto/external/serie-external.dto';
import { CreatorExternal } from '../dto/external/creator-external.dto';
import { Creator } from '../types/creator.types';
import { SaveSerieHandler } from '../handlers/save-serie.handler';
import { CreatorAdapter } from '../adapter/creator.adapter';
import { CreatorManager } from '../managers/creator.manager';
import { CreatorRepository } from '../repository/creator.repository';
import { CharacterAdapter } from '../adapter/character.adapter';
import { CharacterManager } from '../managers/character.manager';
import { CharacterExternal } from 'src/dto/external/character-external.dto';
import { Character } from '../types/character.types';
import { StorieAdapter } from '../adapter/storie.adapter';
import { StorieManager } from '../managers/storie.manager';
import { StorieRepository } from '../repository/storie.repository';
import { EventAdapter } from '../adapter/event.adapter';
import { EventManager } from '../managers/event.manager';
import { EventRepository } from '../repository/event.repository';
import { StorieExternal } from '../dto/external/storie-external.dto';
import { Storie } from '../types/storie.types';
import { EventExternal } from '../dto/external/event-external.dto';
import { Event } from '../types/event.types';
import comicModel from '../schema/comic.schema'

export class PopulateService {

    private readonly serieAdapter: SerieAdapter = new SerieAdapter();
    private readonly serieManager: SerieManager = SerieManager.getInstance();

    private readonly comicAdapter: ComicAdapter = new ComicAdapter();
    private readonly comicManager: ComicManager = ComicManager.getInstance();
    private readonly comicRepository: ComicRepository = new ComicRepository(comicModel);

    private readonly creatorAdapter: CreatorAdapter = new CreatorAdapter();
    private readonly creatorManager: CreatorManager = CreatorManager.getInstance();
    private readonly creatorRepository: CreatorRepository = new CreatorRepository();

    private readonly characterAdapter: CharacterAdapter = new CharacterAdapter();
    private readonly characterManager: CharacterManager = CharacterManager.getInstance();
    private readonly characterRepository: CharacterRepository = new CharacterRepository();

    private readonly storieAdapter: StorieAdapter = new StorieAdapter();
    private readonly storieManager: StorieManager = StorieManager.getInstance();
    private readonly storieRepository: StorieRepository = new StorieRepository();

    private eventAdapter: EventAdapter = new EventAdapter();
    private eventManager: EventManager = EventManager.getInstance();
    private eventRepository: EventRepository = new EventRepository();

    public async save(id: string): Promise<any> {

        const url = UrlExternalUtils.generateFind("series", id);
        const response: ResponseAPI<SerieExternal> = await Request.findByUrl(url);

        const serie: Serie = await this.serieAdapter.toInternal(response.data.results[0])
        return this.saveSerie(serie, response);
    }

    private async saveSerie(serie: Serie, response: ResponseAPI<Serie>) {

        console.time('Time');
        const newSerie: Serie = await this.updateSerie(serie);
        await this.serieManager.findSerie(newSerie);

        await this.updateComicsBySerie(response.data.results[0]);
        await this.updateCreatorsBySerie(response.data.results[0]);
        await this.updateCharactersBySerie(response.data.results[0]);
        await this.updateStoriesBySerie(response.data.results[0]);
        await this.updateEventsBySerie(response.data.results[0]);
        console.timeEnd('Time');
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
    }

    private async updateCreatorsBySerie(serie: Serie) {

        const response: ResponseAPI<CreatorExternal>[] = await Request.findByCollection(serie.creators as CollectionURI);
        const allCreators: CreatorExternal[] = response.map(response => response.data.results).flat();
        const sizeCreators: number = allCreators.length;

        const newCreators: Creator[] = [];
        for(let i = 0; i < sizeCreators; i++) {

            const creator: Creator = await this.creatorAdapter.toInternalSave(allCreators[i]);
            const newCreator: Creator = await this.creatorManager.findCreator(creator);
            
            const saveSerie: SaveSerieHandler = new SaveSerieHandler(newCreator, allCreators[i].series as CollectionURI);
            const saveStorie: SaveStorieHandler = new SaveStorieHandler(newCreator, allCreators[i].stories as CollectionURI);
            const saveEvent: SaveEventHandler = new SaveEventHandler(newCreator, allCreators[i].events as CollectionURI);
            const saveComic: SaveComicHandler = new SaveComicHandler(newCreator, allCreators[i].comics as CollectionURI);

            saveSerie.setNext(saveStorie);
            saveStorie.setNext(saveEvent);
            saveEvent.setNext(saveComic);

            await saveSerie.save();
            newCreators.push(newCreator);

        }

        this.creatorRepository.updateMany(newCreators);
    }

    private async updateCharactersBySerie(serie: Serie) {

        const response: ResponseAPI<CharacterExternal>[] = await Request.findByCollection(serie.characters as CollectionURI);
        const allCharacters: CharacterExternal[] = response.map(response => response.data.results).flat();
        const sizeCharacters: number = allCharacters.length;

        const newCharacters: Character[] = [];
        for(let i = 0; i < sizeCharacters; i++) {

            const character: Character = await this.characterAdapter.toInternalSave(allCharacters[i]);
            const newCharacter: Character = await this.characterManager.findCharacter(character);
            
            const saveComic: SaveComicHandler = new SaveComicHandler(newCharacter, allCharacters[i].comics as CollectionURI);
            const saveSerie: SaveSerieHandler = new SaveSerieHandler(newCharacter, allCharacters[i].series as CollectionURI);
            const saveStorie: SaveStorieHandler = new SaveStorieHandler(newCharacter, allCharacters[i].stories as CollectionURI);
            const saveEvent: SaveEventHandler = new SaveEventHandler(newCharacter, allCharacters[i].events as CollectionURI);

            saveComic.setNext(saveSerie);
            saveSerie.setNext(saveStorie);
            saveStorie.setNext(saveEvent);

            await saveComic.save();
            newCharacters.push(newCharacter);

        }

        this.characterRepository.updateMany(newCharacters);
    }

    private async updateStoriesBySerie(serie: Serie) {

        const response: ResponseAPI<StorieExternal>[] = await Request.findByCollection(serie.stories as CollectionURI);
        const allStories: StorieExternal[] = response.map(response => response.data.results).flat();
        const sizeStories: number = allStories.length;

        const newStories: Storie[] = [];
        for(let i = 0; i < sizeStories; i++) {

            const storie: Storie = await this.storieAdapter.toInternalSave(allStories[i]);
            const newStorie: Storie = await this.storieManager.findStorie(storie);
            
            const saveCreator: SaveCreatorHandler = new SaveCreatorHandler(newStorie, allStories[i].creators as CollectionURI);
            const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler(newStorie, allStories[i].characters as CollectionURI);
            const saveSerie: SaveSerieHandler = new SaveSerieHandler(newStorie, allStories[i].series as CollectionURI);
            const saveComic: SaveComicHandler = new SaveComicHandler(newStorie, allStories[i].comics as CollectionURI);
            const saveEvent: SaveEventHandler = new SaveEventHandler(newStorie, allStories[i].events as CollectionURI);

            saveCreator.setNext(saveCharacter);
            saveCharacter.setNext(saveSerie);
            saveSerie.setNext(saveComic);
            saveComic.setNext(saveEvent);

            await saveCreator.save();
            newStories.push(newStorie);

        }

        this.storieRepository.updateMany(newStories);
    }

    private async updateEventsBySerie(serie: Serie) {

        const response: ResponseAPI<EventExternal>[] = await Request.findByCollection(serie.events as CollectionURI);
        const allEvents: EventExternal[] = response.map(response => response.data.results).flat();
        const sizeEvents: number = allEvents.length;

        const newEvents: Event[] = [];
        for(let i = 0; i < sizeEvents; i++) {

            const event: Event = await this.eventAdapter.toInternalSave(allEvents[i]);
            const newEvent: Event = await this.eventManager.findEvent(event);
            
            const saveCreator: SaveCreatorHandler = new SaveCreatorHandler(newEvent, allEvents[i].creators as CollectionURI);
            const saveCharacter: SaveCharacterHandler = new SaveCharacterHandler(newEvent, allEvents[i].characters as CollectionURI);
            const saveStorie: SaveStorieHandler = new SaveStorieHandler(newEvent, allEvents[i].stories as CollectionURI);
            const saveComic: SaveComicHandler = new SaveComicHandler(newEvent, allEvents[i].comics as CollectionURI);
            const saveSerie: SaveSerieHandler = new SaveSerieHandler(newEvent, allEvents[i].series as CollectionURI);

            saveCreator.setNext(saveCharacter);
            saveCharacter.setNext(saveStorie);
            saveStorie.setNext(saveComic);
            saveComic.setNext(saveSerie);

            await saveCreator.save();
            newEvents.push(newEvent);

        }

        this.eventRepository.updateMany(newEvents);
    }

}