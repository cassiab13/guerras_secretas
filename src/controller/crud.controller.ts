import { Request, Response } from "express";
import { StatusCode } from "../enums/status.code";
import { ICrudController } from "../interfaces/crud.controller";
import { ICrudService } from "../interfaces/crud.service";

export abstract class CrudController<Entity> implements ICrudController {
    
    protected readonly crudService: ICrudService<Entity>;

    constructor(crudService: ICrudService<Entity>) {
        this.crudService = crudService;
    }

    public async create(req: Request, res: Response): Promise<void> {

        const data: Entity = req.body;
        
        this.crudService.create(data);
        res.status(StatusCode.CREATED).json();
    }

    public async update(req: Request, res: Response): Promise<void> {

        const id = req.params.id;
        const updatedData: Entity = req.body;

        this.crudService.update(id, updatedData);
        res.status(StatusCode.SUCCESS).json();
        
    }

    public async delete(req: Request, res: Response): Promise<void> {

        const id = req.params.id;
        
        this.crudService.delete(id);
        res.status(StatusCode.NO_CONTENT).json();
        
    }

    public async findById(req: Request, res: Response): Promise<void> {

        const id = req.params.id;
        
        const data: Entity = await this.crudService.find(id);
        res.status(StatusCode.SUCCESS).json(data);
        
    }

    public async findAll(req: Request, res: Response): Promise<void> {

        const page: number = parseInt(req.query.page as string, 10) || 1;
        const pageSize: number = parseInt(req.query.pageSize as string, 10) || 10;

        const values: Entity[] = await this.crudService.findAll(page, pageSize);
        res.status(StatusCode.SUCCESS).json(values);
    }

}
