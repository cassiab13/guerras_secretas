import { Request, Response } from "express";
import { SerieService } from "../../service/external/serie.service";

export class SerieController {

    private service: SerieService;

    constructor(service: SerieService) {
        this.service = service;
    }

    public async findById(request: Request, response: Response) {

        const id: string = request.params.id;
        const teste = await this.service.findById(id);

        response.status(200).json(teste);

    }

}