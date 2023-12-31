import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requiereAuth = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.currentUser){
        throw new NotAuthorizedError();
    }

    next();
};