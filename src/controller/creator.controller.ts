import { Request, Response } from 'express';
import { CreatorService } from '../service/creator.service';
import { CrudController } from './crud.controller';
import { Creator } from '../types/creator.types';
import { StatusCode } from '../enums/status.code';

export class CreatorController extends CrudController<Creator> {
    private readonly creatorService: any;
    constructor(service: CreatorService) {
        super(service);
    }

    public async findComicsByCreator(
        req: Request,
        res: Response
    ): Promise<void> {
        const id = req.params.id;
        this.creatorService.findComicsByCreator(id);
        res.status(StatusCode.SUCCESS).json();
    }

    public async findCreatorsByRole(
        req: Request,
        res: Response
    ): Promise<void> {
        const role = req.params.role;
        this.creatorService.findCreatorByRole(role);
        res.status(StatusCode.SUCCESS).json();
    }
}
