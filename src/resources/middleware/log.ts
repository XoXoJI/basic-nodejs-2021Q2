import { NextFunction, Request, Response } from "express";
import { finished } from 'stream';
import { logger } from "../../common/logger";

export function log(req: Request, res: Response, next: NextFunction) {
    const { url, query, body, params } = req;

    finished(res, () => {
        logger.info({
            url,
            query,
            body,
            params,
            code: res.statusCode,
        });
    });

    next();
}
