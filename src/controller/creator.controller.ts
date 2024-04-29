import { CreatorService } from 'src/service/creator.service';
import { CrudController } from './crud.controller';
import { Creator } from 'src/types/creator.types';

export class CreatorController extends CrudController<Creator> {
    constructor(service: CreatorService) {
        super(service);
    }
}
