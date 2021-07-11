import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../common/logger";
import EntityNotExistsError from "../../lib/error/dbError/entityNotExistsError";

export function notFoundError(err: Error, _req: Request, res: Response, next: NextFunction) {
    logger.error(err.message);

    if (err instanceof EntityNotExistsError) {
        res.sendStatus(StatusCodes.NOT_FOUND);
    }

    next(err);
}

export function error(_err: Error, _req: Request, res: Response, _next: NextFunction) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
}
