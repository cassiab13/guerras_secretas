import { Request, Response } from "express";
import { ExternalService } from "../../service/external/event.service";

export class ExternalController {

    private service: ExternalService;

    constructor(service: ExternalService) {
        this.service = service;
    }

    public async save(request: Request, response: Response) {

        const id: string = request.params.id;
        const seila = await this.service.save(id);

        response.status(201).json(seila);

    }

}