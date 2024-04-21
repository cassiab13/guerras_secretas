import { Comic } from "src/types/comic.types";
import { CrudService } from "./crud.service";
import { ComicRepository } from "src/repository/comic.repository";

export class ComicService extends CrudService<Comic> {

    constructor(repository: ComicRepository) {
        super(repository);
    }
    
}