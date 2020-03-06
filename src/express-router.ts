import { RoutableFunction, ExpressCallbackHandler, Context, InjectableFunction, ValidatableFunction } from './interface/common-interfaces';
import { DecoRouterError } from './deco-router-error';
import { Request, Response, NextFunction } from "express";

export interface RouteCallbacks {
    routeCallback?: RoutableFunction,
    paramValidateCallback?: ValidatableFunction,
    beforeCallback?: InjectableFunction,
    afterCallback?: InjectableFunction
}

export default function makeExpressRoute(callbacks: RouteCallbacks, shouldNext: boolean = false): ExpressCallbackHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (callbacks.routeCallback === undefined) {
            next(new DecoRouterError(500, "No routing function defined"));
            return;
        }

        let context: Context = {
            request: req,
            response: res,
            additional: {}
        }
        try {

            if (callbacks.paramValidateCallback) {
                await callbacks.paramValidateCallback(context);
            }
            
            if (callbacks.beforeCallback) {
                await callbacks.beforeCallback(context);
            }

            await callbacks.routeCallback(context);

            if (callbacks.afterCallback) {
                await callbacks.afterCallback(context);
            }

            if (shouldNext) {
                next();
            }
        } catch (e) {            
            if (e instanceof DecoRouterError) {
                next(e);
            } else {
                next(new DecoRouterError(500, e.message));
            }
        }
    };
}

