import { ValidatePostParamMap } from '../reflect-symbols';
import { RequestParamOptions, RequestParamMetadata } from '../interface/common-interfaces';

export function PostParam(paramKey: string, options?: RequestParamOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`ValidatePostParam: called, target=${target}, propertyKey=${propertyKey}, descriptor=${descriptor}, paramKey=${paramKey}`);

        if (options == null) {
            options = { 
                required: true
            }
        }

        const metadata: RequestParamMetadata = {
            type: "post",
            paramKey: paramKey,
            options: options
        }

        let metaList: RequestParamMetadata[] = Reflect.getOwnMetadata(ValidatePostParamMap, target.constructor, propertyKey);
        if (metaList) {
            metaList.push(metadata);
        } else {
            metaList = [metadata];
        }
        Reflect.defineMetadata(ValidatePostParamMap, metaList, target.constructor, propertyKey);
    }
}