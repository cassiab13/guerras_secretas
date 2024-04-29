import { CreatorRepository } from 'src/repository/creator.repository';
import { CrudService } from './crud.service';
import { Creator } from 'src/types/creator.types';

export class CreatorService extends CrudService<Creator> {
    constructor(repository: CreatorRepository) {
        super(repository);
    }
}
