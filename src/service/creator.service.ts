import { CreatorRepository } from '../repository/creator.repository';
import { CrudService } from './crud.service';
import { Creator } from '../types/creator.types';
import { Comic } from '../types/comic.types';

export class CreatorService extends CrudService<Creator> {
    constructor(repository: CreatorRepository) {
        super(repository);
    }

    public async findComicsByCreator(id: string): Promise<Comic[]> {
        const creator: Creator | null = await this.find(id);
        const comics = creator.comics as Comic[];
        return comics;
    }
    // public async findCreatorsByRole(role: string): Promise<Creator[]> {

    // }
}
