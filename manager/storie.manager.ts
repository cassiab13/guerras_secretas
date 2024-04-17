import { Storie } from 'types/storie.types';
import { StorieRepository } from 'repository/storie.repository';

export class StorieManager {

    private static instance: StorieManager | null = null;
    private static uriByObjectId: Map<string, Storie> = new Map();
    private static readonly repository: StorieRepository = new StorieRepository();
    
    public static getInstance(): StorieManager {

        if(!StorieManager.instance) {
            StorieManager.instance = new StorieManager();
        }

        return StorieManager.instance;
    }

    public static async findCharacter(storie: Storie): Promise<Storie> {
        
        if (StorieManager.uriByObjectId.has(storie.resourceURI)) {
            return StorieManager.uriByObjectId.get(storie.resourceURI)!;
        }

        return this.saveStorie(storie);
    }
    
    private static async saveStorie(storie: Storie): Promise<Storie> {
        
        const newStorie: Storie = await StorieManager.repository.create(storie);
        StorieManager.uriByObjectId.set(newStorie.resourceURI, newStorie);
        
        return newStorie; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const stories: Storie[] = await StorieManager.repository.findAll();
        stories.map(storie => {
            StorieManager.uriByObjectId.set(storie.resourceURI, storie);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}