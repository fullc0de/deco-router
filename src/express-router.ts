import { RoutableFunction, ExpressCallbackFunction, Context, InjectableFunction, ValidatableFunction } from './interface/common-interfaces';
import { DecoRouterError } from './deco-router-error';

export interface RouteCallbacks {
    routeCallback?: RoutableFunction,
    paramValidateCallback?: ValidatableFunction,
    beforeCallback?: InjectableFunction,
    afterCallback?: InjectableFunction
}

export default function makeExpressRoute(callbacks: RouteCallbacks, shouldNext: boolean = false): ExpressCallbackFunction {
    return async (req, res, next) => {
        if (callbacks.routeCallback === undefined) {
            res.status(500).send({ error: "No routing function defined"});
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
                res.status(e.statusCode).send({ error: `${e.message}`});
            } else {
                res.status(500).send({ error: `${e.message}`});
            }
        }
    };
}

