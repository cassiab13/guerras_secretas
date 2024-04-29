import { Request, Response } from 'express';
import { CharacterService } from 'src/service/character.service';
import { CrudController } from './crud.controller';
import { Character } from '../types/character.types';
import { StatusCode } from '../enums/status.code';

export class CharacterController extends CrudController<Character> {
    private readonly characterService: any;

    constructor(service: CharacterService) {
        super(service);
    }

    public async findComicsByCharacter(
        req: Request,
        res: Response
    ): Promise<void> {
        const id = req.params.id;
        this.characterService.findComicsByCharacter(id);
        res.status(StatusCode.SUCCESS).json();
    }
}
