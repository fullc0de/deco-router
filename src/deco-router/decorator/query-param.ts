import { ValidateQueryParamMap } from '../reflect-symbols';
import { RequestParamOptions, RequestParamMetadata } from '../interface/common-interfaces';

export function QueryParam(paramKey: string, options?: RequestParamOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`ValidateQueryParam: called, target=${target}, propertyKey=${propertyKey}, descriptor=${descriptor}, paramKey=${paramKey}`);

        if (options == null) {
            options = { 
                required: true
            }
        }

        const metadata: RequestParamMetadata = {
            type: "query",
            paramKey: paramKey,
            options: options
        }

        let metaList: RequestParamMetadata[] = Reflect.getOwnMetadata(ValidateQueryParamMap, target.constructor, propertyKey);
        if (metaList) {
            metaList.push(metadata);
        } else {
            metaList = [metadata];
        }
        Reflect.defineMetadata(ValidateQueryParamMap, metaList, target.constructor, propertyKey);
    }
}