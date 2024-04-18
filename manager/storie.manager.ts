import { Storie } from 'types/storie.types';
import { StorieRepository } from '../repository/storie.repository';

export class StorieManager {
    
    private static instance: StorieManager | null = null;
    private static storieById: Map<number, Storie> = new Map();
    private static readonly repository: StorieRepository = new StorieRepository();
    
    public static getInstance(): StorieManager {

        if(!StorieManager.instance) {
            StorieManager.instance = new StorieManager();
        }

        return StorieManager.instance;
    }

    public async findStorie(storie: Storie): Promise<Storie> {
        
        if (StorieManager.storieById.has(storie.id)) {
            return StorieManager.storieById.get(storie.id)!;
        }

        return this.saveStorie(storie);
    }
    
    private async saveStorie(storie: Storie): Promise<Storie> {
        
        const newStorie: Storie = await StorieManager.repository.create(storie);
        StorieManager.storieById.set(newStorie.id, newStorie);
        
        return newStorie; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const stories: Storie[] = await StorieManager.repository.findAll();
        stories.map(storie => {
            StorieManager.storieById.set(storie.id, storie);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}