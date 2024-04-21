import { Request, Response } from 'express';
import { User } from '../../src/types/user.types';
import { Token } from '../../src/utils/token.utils';

export class UserController {

    public async create(request: Request, response: Response) {

        const user: User = request.body;
        const token: Token = new Token();
        const tokenHash = token.generate(user);
        console.log(tokenHash);
        token.verify(tokenHash);
        response.status(200).json();

    }


}