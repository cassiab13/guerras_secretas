import { PopulateManager } from "../managers/populate.manager";

export class PopulateService {

   private populateManager: PopulateManager = new PopulateManager();

   public async serie(idSerie: string, updates: any) {
    this.populateManager.saveSerie(idSerie, updates);
   }
   
}