import { Model } from 'mongoose';
import { Creator } from 'src/types/creator.types';
import { CrudRepository } from './crud.repository';

export class CreatorRepository extends CrudRepository<Creator> {
    constructor(model: Model<Creator>) {
        super(model);
    }

    public async create(creator: Creator): Promise<Creator> {
        return this.model.create(creator);
    }

    public async createAll(creators: Creator[]): Promise<void> {
        await this.model.create(creators);
    }
}
