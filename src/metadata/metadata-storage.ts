import { RoutableFunction } from "../interface/common-interfaces";
import { ControllerInterface } from '../interface/controller-interface';
import { InjectorInterface } from '../interface/injector-interface';
import { deepCopy, prevVer } from '../util';

interface RouteMetadataInterface {
    version: string,
    path: string, 
    ctor: any,
    handlers: ControllerInterface,
    options: RouteMetadataOptionsInterface
}

export interface RouteMetadataOptionsInterface {
    userAuthInjector?: InjectorInterface
}

export interface RouteInfo {
    method: "get"|"post"|"put"|"delete",
    path: string,
    ctor: any,
    handler: RoutableFunction,
    routeOptions: RouteMetadataOptionsInterface
}

export class MetadataStorage {

    private routes: RouteMetadataInterface[] = [];

    public registerRoute(path: string, version: string, ctor: any, options: RouteMetadataOptionsInterface) {
        this.routes.push({
            version: version,
            path: path,
            ctor: ctor,
            handlers: {
                index: ctor.prototype?.index,
                show: ctor.prototype?.show,
                post: ctor.prototype?.post,
                put: ctor.prototype?.put,
                delete: ctor.prototype?.delete
            },
            options: options
        });
    }
    
    public buildRoutes(prefix?: string): RouteInfo[] {
        let sortedRoutes = this.routes
        .sort((a, b) => {
            if (a.version > b.version) {
                return 1;
            } else if (a.version < b.version) {
                return -1;
            } else {
                return a.path < b.path ? 1 : -1;
            }
        });

        let versionMap: { [version: string]: RouteMetadataInterface[] } = {};

        sortedRoutes.forEach((route) => {
            let targetPaths = versionMap[route.version];
            if (targetPaths == null) {
                let prev = prevVer(route.version);
                if (prev) {
                    let prevPaths = versionMap[prev];
                    if (prevPaths) {
                        targetPaths = prevPaths.map((r) => deepCopy(r));
                        targetPaths.forEach((r) => {
                            r.version = route.version;
                        });
                    } else {
                        targetPaths = [];
                    }
                } else {
                    targetPaths = [];
                }
            }
            const foundIndex = targetPaths.findIndex((r) => r.path === route.path);
            if (foundIndex !== -1) {
                targetPaths[foundIndex] = route;
            } else {
                targetPaths.push(route);
            }
            
            versionMap[route.version] = targetPaths;
        });

        // versionMap["v1"].forEach((r) => console.log(`v1 [${r.path}] index handler = ${r.handlers.index}`));
        // versionMap["v2"].forEach((r) => console.log(`v2 [${r.path}] index handler = ${r.handlers.index}`));

        let routeInfos: RouteInfo[] = [];
        for(let key in versionMap) {
            let pathPrefix = "/";
            if (prefix) {
                pathPrefix += prefix;
            }
            versionMap[key].forEach((route) => {
                if (route.handlers.index) {
                    routeInfos.push({
                        method: "get",
                        path: `${pathPrefix}/${route.version}/${route.path}`,
                        ctor: route.ctor,
                        handler: route.handlers.index,
                        routeOptions: route.options
                    })    
                }

                if (route.handlers.show) {
                    routeInfos.push({
                        method: "get",
                        path: `${pathPrefix}/${route.version}/${route.path}/:id`,
                        ctor: route.ctor,
                        handler: route.handlers.show,
                        routeOptions: route.options
                    })    
                }

                if (route.handlers.post) {
                    routeInfos.push({
                        method: "post",
                        path: `${pathPrefix}/${route.version}/${route.path}`,
                        ctor: route.ctor,
                        handler: route.handlers.post,
                        routeOptions: route.options
                    })    
                }

                if (route.handlers.put) {
                    routeInfos.push({
                        method: "put",
                        path: `${pathPrefix}/${route.version}/${route.path}/:id`,
                        ctor: route.ctor,
                        handler: route.handlers.put,
                        routeOptions: route.options
                    })    
                }

                if (route.handlers.delete) {
                    routeInfos.push({
                        method: "delete",
                        path: `${pathPrefix}/${route.version}/${route.path}/:id`,
                        ctor: route.ctor,
                        handler: route.handlers.delete,
                        routeOptions: route.options
                    })    
                }
            })
        }

        return routeInfos;
    }
}