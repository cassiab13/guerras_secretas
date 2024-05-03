import { Request, Response } from "express";
import { PopulateService } from "../service/populate.service";

export class PopulateController {

    private service: PopulateService;

    constructor(service: PopulateService) {
        this.service = service;
    }

    public async save(request: Request, response: Response) {

        const id: string = request.params.id;
        const fields: string[] = ['comics', 'creators', 'characters', 'stories', 'events'];
        const updates: any = this.catchFieldsForUpdate(request.query, fields);

        await this.service.serie(id, updates);

        response.status(201).json();

    }

    private catchFieldsForUpdate(query: any, fields: string[]) {

        const updates: any = {};

        fields.forEach(field => {
            updates[field] = query[field] === 'true' ? true : false;
        });

        return updates;
    }

}