import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/status.code';
const Joi = require('joi-oid');

export class Validate {

    public static async body(request: Request, response: Response, next: NextFunction, body: any): Promise<void> {
        const { error } = Joi.validate(request.body, body); 
        const valid = error == null; 
  
        if (valid) { 
            next(); 
        }
            
        const { details } = error; 
        const message = details.map((i: any) => i.message).join(',');
  
        response.status(StatusCode.BAD_REQUEST).json({ error: message })  
    } 
}



