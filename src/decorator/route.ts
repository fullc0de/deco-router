import { getStore } from '../metadata/index';
import { isAPIVer } from '../util';
import { ControllerInterface } from '../interface/controller-interface';
import { UserAuthMap } from '../reflect-symbols';

export function Route<T extends ControllerInterface & Function>(path: string, version: string) {
    return function (target: T) {
        const authInjector = Reflect.getOwnMetadata(UserAuthMap, target);
        if (isAPIVer(version)) {
            getStore().registerRoute(path, version, target, { userAuthInjector: authInjector });
        }
    }
}