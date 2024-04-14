import { SerieRepository } from '../repository/serie.repository';
import { Serie } from '../types/serie.types';

export class SerieService {

    private repository: SerieRepository;

    constructor(repository: SerieRepository) {
        this.repository = repository;
    }

    public findById(id: number): Serie {

    }

    private createGetExternalApi(id: number) {
        return 
    }

}