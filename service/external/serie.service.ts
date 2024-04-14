import { ResponseAPI } from './../../dto/external/response-api.dto';
import { SerieExternal } from './../../dto/external/serie-external.dto';
import { SerieRepository } from '../../repository/serie.repository';
import { UrlExternalUtils } from '../../utils/external/url.utils';
import { SerieAdapter } from '../../adapter/serie.adapter';

export class SerieService {

    private repository: SerieRepository;
    private adapter: SerieAdapter = new SerieAdapter();

    constructor(repository: SerieRepository) {
        this.repository = repository;
    }

    public async findById(id: string): Promise<SerieExternal> {

        const response = await fetch(UrlExternalUtils.generateFind('series', id));
        const serie: ResponseAPI<SerieExternal> = await response.json(); 

        const newSerie = await this.adapter.toInternal(serie.data.results[0]);
        await this.repository.create(newSerie);

        return serie.data.results[0];
    }

}