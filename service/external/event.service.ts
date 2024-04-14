import { SaveEventHandler } from '../../chain-of-responsibility/save-event.handler';
import { UrlExternalUtils } from '../../utils/external/url.utils';

export class ExternalService {

    public async save(id: string): Promise<void> {

        const saveEvent: SaveEventHandler = new SaveEventHandler();
        const url = UrlExternalUtils.generateFind('events', id);
        
        saveEvent.save(url);
    }

}