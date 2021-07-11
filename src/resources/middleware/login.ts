import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from "jsonwebtoken";

const WHITE_LIST_ROUTERS = process.env['WHITE_LIST_ROUTERS']?.split(', ') || [];
const TEXT_ERROR = 'wrong token';

export function checkLogin(req: Request, res: Response, next: NextFunction) {
    if (WHITE_LIST_ROUTERS.indexOf(req.path) !== -1) {
        next();

        return;
    }

    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        const [type, token] = authorizationHeader.split(' ');

        if (type === 'Bearer' && token) {
            try {
                jwt.verify(token, process.env['JWT_SECRET_KEY'] || '');

                next();
            } catch (err) {
                res.status(StatusCodes.UNAUTHORIZED).json(TEXT_ERROR);
            }

            return;
        }
    }

    res.status(StatusCodes.UNAUTHORIZED).send(TEXT_ERROR);
}
