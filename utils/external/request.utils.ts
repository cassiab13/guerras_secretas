import { ResponseAPI } from 'dto/external/response-api.dto';
import { CollectionURI } from './../../dto/external/collection-uri.dto';
import { UrlExternalUtils } from './url.utils';
import { Serie } from 'types/serie.types';

export class Request {

    private static readonly LIMIT: number = 100;

    public static async findByUrl(url: string): Promise<ResponseAPI<any>> {
        
        const response = await fetch(url);
        return response.json();
    }


    public static async findByCollection(collection: CollectionURI): Promise<ResponseAPI<any>[]> {
        
        const requests = this.generateRequest(collection);

        return Promise.all(requests.map(url => fetch(url).then(response => response.json())));
    }

    private static generateRequest(collection: CollectionURI): string[] {

        const requests: string[] = [];
        const quantityRequest: number = Math.ceil(collection.available / this.LIMIT);
        
        for (let i = 0; i < quantityRequest; i++) {
            const request: string = this.generateUrl(collection.collectionURI, i);
            requests.push(request)
        }

        return requests;
    }

    private static generateUrl(uri: string, multiplier: number): string {
        return `${uri}${UrlExternalUtils.generateCredentials()}&offset=${multiplier * this.LIMIT}&limit=${multiplier * this.LIMIT + this.LIMIT}`
    }

} 