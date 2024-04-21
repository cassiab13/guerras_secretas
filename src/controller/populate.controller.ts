import { Request, Response } from "express";
import { PopulateService } from "../service/populate.service";

export class PopulateController {

    private service: PopulateService;

    constructor(service: PopulateService) {
        this.service = service;
    }

    public async save(request: Request, response: Response) {

        const id: string = request.params.id;
        this.service.save(id);

        response.status(201).json();

    }

}