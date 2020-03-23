import { getStore } from '../metadata/index';
import { isAPIVer } from '../util';
import { ControllerInterface } from '../interface/controller-interface';
import { UserAuthMap } from '../reflect-symbols';

export interface RouteOptions {
    /**
     * a class decorated by Route is regarded as action path not resource path.
     * Effects
     * - This will make paths without '/:id' element at the end of the paths if the paths originally involve it.
     * - `show` method will get disabled.
     */
    treatAsAction?: boolean
}

export function Route<T extends ControllerInterface & Function>(path: string, version: string, options?: RouteOptions) {
    return function (target: T) {
        const authInjector = Reflect.getOwnMetadata(UserAuthMap, target);
        if (isAPIVer(version)) {
            getStore().registerRoute(path, version, target, { userAuthInjector: authInjector, routeParamOptions: options });
        }
    }
}