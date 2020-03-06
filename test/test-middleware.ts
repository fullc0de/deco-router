import { Request, Response, NextFunction } from "express";

export function testMiddleware(req: Request, res: Response, next: NextFunction) {
    (req as any).test = "test-middleware";
    next();
}

export function drainMiddleware(req: Request, res: Response, next: NextFunction) {
    res.status(404).send({});
}

export function afterMiddleware(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({
        message: (req as any).message,
        afterMessage: "after-middleware"
    });
}