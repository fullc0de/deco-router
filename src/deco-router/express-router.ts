import { RoutableFunction, ExpressFunction, Context, InjectableFunction, ValidatableFunction } from './interface/common-interfaces';
import { DecoRouterError } from './deco-router-error';

export interface RouteCallbacks {
    routeCallback?: RoutableFunction,
    paramValidateCallback?: ValidatableFunction,
    beforeCallback?: InjectableFunction,
    afterCallback?: InjectableFunction
}

export default function makeExpressRoute(callbacks: RouteCallbacks): ExpressFunction {
    return async (req, res) => {
        if (callbacks.routeCallback === undefined) {
            res.status(500).send({ error: "No routing function defined"});
            return;
        }

        let context: Context = {
            request: {
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers
            },
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

            if (context.response !== undefined) {
                if (context.response.headers !== undefined) {
                    res.set(context.response.headers);
                }
                res.type('json');
                res.status(context.response.statusCode).send(context.response.body);    
            } else {
                res.status(500).send({ error: `a response of a context is undefined`});
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

