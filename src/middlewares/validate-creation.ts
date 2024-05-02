import { NextFunction, Request, Response } from 'express';
import { createCharacterDTO } from '../dto/create.character.dto';

export function validateCharacterCreation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { error, value } = createCharacterDTO.validate(req.body);
    if (error) {
        return res.status(400);
    }
    next();
}
