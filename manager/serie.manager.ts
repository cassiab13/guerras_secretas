import { Serie } from 'types/serie.types';
import { SerieRepository } from 'repository/serie.repository';

export class SerieManager {

    private static instance: SerieManager | null = null;
    private static uriByObjectId: Map<string, Serie> = new Map();
    private static readonly repository: SerieRepository = new SerieRepository();
    
    public static getInstance(): SerieManager {

        if(!SerieManager.instance) {
            SerieManager.instance = new SerieManager();
        }

        return SerieManager.instance;
    }

    public static async findCharacter(serie: Serie): Promise<Serie> {
        
        if (SerieManager.uriByObjectId.has(serie.resourceURI)) {
            return SerieManager.uriByObjectId.get(serie.resourceURI)!;
        }

        return this.saveSerie(serie);
    }
    
    private static async saveSerie(serie: Serie): Promise<Serie> {
        
        const newSerie: Serie = await SerieManager.repository.create(serie);
        SerieManager.uriByObjectId.set(newSerie.resourceURI, newSerie);
        
        return newSerie; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const series: Serie[] = await SerieManager.repository.findAll();
        series.map(serie => {
            SerieManager.uriByObjectId.set(serie.resourceURI, serie);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}