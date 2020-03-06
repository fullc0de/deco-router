import { MiddlewareMap } from "../reflect-symbols";
import { ExpressCallbackHandler, Dict } from '../interface/common-interfaces';

export function Middleware(funcs: ExpressCallbackHandler[], position: "before"|"after" = "before") {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (process.env.DEBUG_VERSIONABLE_EXPRESS_ROUTER === "1") {
            console.log(`Middleware: called, target=${target}, propertyKey=${propertyKey}, descriptor=${descriptor}, middlewares=${funcs.map((f) => f.name).join(",")}`);
        }

        let middlewaresByPos: Dict<ExpressCallbackHandler[]> = Reflect.getOwnMetadata(MiddlewareMap, target.constructor, propertyKey);
        if (middlewaresByPos == null) {
            middlewaresByPos = {}
        }
        middlewaresByPos[position] = funcs;

        Reflect.defineMetadata(MiddlewareMap, middlewaresByPos, target.constructor, propertyKey);
    }
}