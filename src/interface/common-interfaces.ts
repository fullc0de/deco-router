
interface ParamDict<T> { [key: string]: T };

interface HttpRequest {
    readonly body: ParamDict<string>
    readonly query: ParamDict<string>
    readonly params: ParamDict<string>
    readonly headers: ParamDict<string>
};

interface HttpResponse {
    headers?: {}
    statusCode: number
    body: string | {}
};

interface Context {
    request: HttpRequest
    response?: HttpResponse
    additional: ParamDict<any>
}

type ExpressCallbackFunction = (req: any, res: any) => void;
type RoutableFunction = (ctx: Context) => Promise<void>;
type InjectableFunction = (ctx: Context) => Promise<void>;
type ValidatableFunction = (ctx: Context) => Promise<void>;

interface RequestParamOptions {
    required: boolean,
    validate?: (value: string) => boolean,
    errorMessage?: string
}

interface RequestParamMetadata {
    type: "query"|"post",
    paramKey: string,
    options: RequestParamOptions
}

export {
    ParamDict,
    HttpRequest,
    HttpResponse,
    Context,
    ExpressCallbackFunction as ExpressFunction,
    RoutableFunction,
    InjectableFunction,
    ValidatableFunction,
    RequestParamOptions,
    RequestParamMetadata
}