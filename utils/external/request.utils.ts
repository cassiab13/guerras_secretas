import { CollectionURI } from './../../dto/external/collection-uri.dto';

export class RequestExternalUtils {

    public static async find(collection: CollectionURI): Promise<any> {
        const response = await fetch(collection.collectionURI);
        return response.json();
    }

} 