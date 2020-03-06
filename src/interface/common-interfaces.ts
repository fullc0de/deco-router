import { NextFunction, Request, Response } from "express";

interface Dict<T> { [key: string]: T };

type HttpRequest = Request;
type HttpResponse = Response;

interface Context {
    request: HttpRequest
    response: HttpResponse
    additional: Dict<any>
}

type ExpressCallbackFunction = (req: Request, res: Response, next: NextFunction) => void;
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
    Dict,
    HttpRequest,
    HttpResponse,
    Context,
    ExpressCallbackFunction,
    RoutableFunction,
    InjectableFunction,
    ValidatableFunction,
    RequestParamOptions,
    RequestParamMetadata
}