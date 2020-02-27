import "reflect-metadata";
import fs from "fs";
import * as path from 'path';
import { getStore } from './metadata/index';
import makeExpressRoute from './express-router';
import { InjectorInterface } from './interface/injector-interface';
import { Context, RouterInterface } from "./interface/common-interfaces";
import { RouteMetadataOptionsInterface } from './metadata/metadata-storage';
import { RouteCallbacks } from './express-router';
import { RequestParamMetadata } from './interface/common-interfaces';
import { ValidateQueryParamMap, ValidatePostParamMap } from './reflect-symbols';
import { DecoRouterError } from './deco-router-error';
import { ControllerInterface } from './interface/controller-interface';
export * from "./decorator/route";
export * from "./decorator/user-auth";
export * from "./decorator/post-param";
export * from "./decorator/query-param";
export * from "./deco-router-error";
export * from "./interface/controller-interface";
export * from "./interface/injector-interface";
export * from "./interface/common-interfaces";
export * from "./metadata";

let beforeInjectors: InjectorInterface[] | undefined = undefined;
export function registerBeforeInjectors(injectors: InjectorInterface[]) {
    beforeInjectors = injectors;
}

let afterInjectors: InjectorInterface[] | undefined = undefined;
export function registerAfterInjectors(injectors: InjectorInterface[]) {
    afterInjectors = injectors;
}

export function buildRouter(router: RouterInterface, prefix: string, controllersOrBasePath: ControllerInterface[] | string) {
    if (typeof controllersOrBasePath == "string") {
        fs.readdirSync(controllersOrBasePath, {withFileTypes: true}).forEach( (dir) => {
            if (dir.name[0] === 'v') {
                require(path.join(controllersOrBasePath, dir.name));
            }
        });    
    }

    const pathInfos = getStore().buildRoutes(prefix);
    pathInfos.forEach((info) => {
        const queryParamMetaList = Reflect.getOwnMetadata(ValidateQueryParamMap, info.ctor, info.handler.name);
        const postParamMetaList = Reflect.getOwnMetadata(ValidatePostParamMap, info.ctor, info.handler.name);

        let validateMetaList: RequestParamMetadata[] = []
        if (queryParamMetaList instanceof Array) {
            validateMetaList.push(...queryParamMetaList);
        }
        if (postParamMetaList instanceof Array) {
            validateMetaList.push(...postParamMetaList);
        }

        const callbacks: RouteCallbacks = {
            routeCallback: info.handler,
            paramValidateCallback: makeReqParamValidateCallback(validateMetaList),
            beforeCallback: makeBeforeCallback(info.routeOptions),
            afterCallback: makeAfterCallback(info.routeOptions)
        }

        console.log(`path = [${info.method}][${info.path}]`);
        switch (info.method) {
            case "get":
                router.get(info.path, makeExpressRoute(callbacks));
                break;
            case "post":
                router.post(info.path, makeExpressRoute(callbacks));
                break;
            case "put":
                router.put(info.path, makeExpressRoute(callbacks));
                break;
            case "delete":
                router.delete(info.path, makeExpressRoute(callbacks));
                break;
        }
    });
}

function makeReqParamValidateCallback(metadataList: RequestParamMetadata[]) {
    return async (ctx: Context) => {
        metadataList.forEach((data) => {
            console.log(`key=${data.paramKey}, required=${data.options.required.toString()}, type=${data.type}`);
            let value: string | undefined = undefined;
            if (data.type == "query") {
                value = ctx.request.query[data.paramKey];
            } else if (data.type == "post") {
                value = ctx.request.body[data.paramKey];
            }
            if (data.options.required && value == null) {
                throw new DecoRouterError(400, `'${data.paramKey}' parameter is required. param_type: [${data.type}]`);
            }
            if (value) {
                if (data.options.validate) {
                    if (data.options.validate(value) == false) {
                        throw new DecoRouterError(400, data.options.errorMessage || `'${value}' of '${data.paramKey}' key is invalid.`);
                    }
                }
            }
        });
    }
}

function makeBeforeCallback(routeOptions: RouteMetadataOptionsInterface) {
    return async (ctx: Context) => {

        if (routeOptions.userAuthInjector) {
            const authInjector = routeOptions.userAuthInjector;
            await authInjector.inject(ctx);    
        }

        if (beforeInjectors) {
            for(const i of beforeInjectors) {
                await i.inject(ctx);
            }
        }
    }
} 

function makeAfterCallback(routeOptions: RouteMetadataOptionsInterface) {
    return async (ctx: Context) => {
        if (afterInjectors) {
            for(const i of afterInjectors) {
                await i.inject(ctx);
            }
        }
    }
}