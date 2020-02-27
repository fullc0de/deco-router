/**
 * Reference
 * https://blog.logrocket.com/4-different-techniques-for-copying-objects-in-javascript-511e422ceb1e/
 */

interface Dict<T> { [key: string]: T };

export function deepCopy<T>(value: T): T {
    if (typeof value !== 'object' || value === null) {
      return value
    }
    if (Array.isArray(value)) {
        return deepArray(value) as T
    }
    return deepObject(value)
}

function deepObject<T extends Dict<any>>(source: T) {
    let result: {[key: string]: any} = {}
    if ((source as any).constructor) {
        result = new ((source as any).constructor as { new (): T })();
    }
    Object.keys(source).forEach((key) => {
        const value = source[key]
        result[key] = deepCopy(value)
    }, {})    
    
    return result as T
}

function deepArray<T extends any[]>(collection: T): T {
    return collection.map((value) => {
        return deepCopy(value)
    }) as T
}

export function isAPIVer(str: string): boolean {
    if (str.slice(0,1) === "v" && +str.slice(1)) {
       return true
    }
    return false
}

export function prevVer(ver: string): string | undefined {
    let prevVN: number = +ver.slice(-1) - 1;
    if (prevVN < 0) {
        return undefined;
    }

    let prevVersion = `v${prevVN}`;
    if (isAPIVer(prevVersion)) {
        return prevVersion;
    } else {
        return undefined;
    }
}