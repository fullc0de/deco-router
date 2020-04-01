import { MiddlewareMap } from "../reflect-symbols";
import { Dict, ExpressHandler } from '../interface/common-interfaces';

export function Middleware(funcs: ExpressHandler[], position: "before"|"after" = "before") {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (process.env.DEBUG_VERSIONABLE_EXPRESS_ROUTER === "1") {
            console.log(`Middleware: called, target=${target}, propertyKey=${propertyKey}, descriptor=${descriptor}, middlewares=${funcs.map((f) => f.name).join(",")}`);
        }

        let middlewaresByPos: Dict<ExpressHandler[]> = Reflect.getOwnMetadata(MiddlewareMap, target.constructor, propertyKey);
        if (middlewaresByPos == null) {
            middlewaresByPos = {}
        }

        middlewaresByPos[position] = funcs.map((f) => applyExceptionCatcher(f));

        Reflect.defineMetadata(MiddlewareMap, middlewaresByPos, target.constructor, propertyKey);
    }
}

function applyExceptionCatcher(handler: ExpressHandler): ExpressHandler {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    }
}
