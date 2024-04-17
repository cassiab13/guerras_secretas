import { Comic } from './../types/comic.types';
import { ComicRepository } from 'repository/comic.repository';

export class ComicManager {

    private static instance: ComicManager | null = null;
    private static comicById: Map<number, Comic> = new Map();
    private static readonly repository: ComicRepository = new ComicRepository();
    
    public static getInstance(): ComicManager {

        if(!ComicManager.instance) {
            ComicManager.instance = new ComicManager();
        }

        return ComicManager.instance;
    }

    public static async findCharacter(comic: Comic): Promise<Comic> {
        
        if (ComicManager.comicById.has(comic.id)) {
            return ComicManager.comicById.get(comic.id)!;
        }

        return this.saveComic(comic);
    }

    private static async saveComic(comic: Comic): Promise<Comic> {

        const newComic: Comic = await ComicManager.repository.create(comic);
        ComicManager.comicById.set(comic.id, newComic);
        
        return newComic; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const comics: Comic[] = await ComicManager.repository.findAll();
        comics.map(comic => {
            ComicManager.comicById.set(comic.id, comic);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}