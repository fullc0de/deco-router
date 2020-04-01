import { ErrorMiddlewareMap } from "../reflect-symbols";
import { ExpressErrorHandler } from '../interface/common-interfaces';

export function ErrorMiddleware(funcs: ExpressErrorHandler[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (process.env.DEBUG_VERSIONABLE_EXPRESS_ROUTER === "1") {
            console.log(`ErrorMiddleware: called, target=${target}, propertyKey=${propertyKey}, descriptor=${descriptor}, middlewares=${funcs.map((f) => f.name).join(",")}`);
        }

        let middlewares: ExpressErrorHandler[] = Reflect.getOwnMetadata(ErrorMiddlewareMap, target.constructor, propertyKey);
        if (middlewares == null) {
            middlewares = []
        }

        middlewares = funcs.map((f) => applyExceptionCatcher(f));

        Reflect.defineMetadata(ErrorMiddlewareMap, middlewares, target.constructor, propertyKey);
    }
}

function applyExceptionCatcher(handler: ExpressErrorHandler): ExpressErrorHandler {
    return (err, req, res, next) => {
        Promise.resolve(handler(err, req, res, next)).catch(next);
    }
}
