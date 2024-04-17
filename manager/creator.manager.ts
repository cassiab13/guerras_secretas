import { Creator } from 'types/creator.types';
import { CreatorRepository } from 'repository/creator.repository';

export class CreatorManager {

    private static instance: CreatorManager | null = null;
    private static uriByObjectId: Map<string, Creator> = new Map();
    private static readonly repository: CreatorRepository = new CreatorRepository();
    
    public static getInstance(): CreatorManager {

        if(!CreatorManager.instance) {
            CreatorManager.instance = new CreatorManager();
        }

        return CreatorManager.instance;
    }

    public static async findCreator(creator: Creator): Promise<Creator> {
        
        if (CreatorManager.uriByObjectId.has(creator.resourceURI)) {
            return CreatorManager.uriByObjectId.get(creator.resourceURI)!;
        }

        return this.saveCreator(creator); 
    }

    private static async saveCreator(creator: Creator): Promise<Creator> {
        
        const newCreator: Creator = await CreatorManager.repository.create(creator);
        CreatorManager.uriByObjectId.set(creator.resourceURI, newCreator);
        
        return newCreator;
    }

    private async populateUriByObjectId(): Promise<void> {

        const creators: Creator[] = await CreatorManager.repository.findAll();
        creators.map(creator => {
            CreatorManager.uriByObjectId.set(creator.resourceURI, creator);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}