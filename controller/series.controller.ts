import { Request, Response } from "express";
import { SerieService } from "../service/serie.service";

export class SeriesController {

    private service: SerieService;

    constructor(service: SerieService) {
        this.service = service;
    }

    public findById(request: Request, response: Response) {

        const id: number = request.params.id;
        this.service

        response.status(200).json({});

    }

}