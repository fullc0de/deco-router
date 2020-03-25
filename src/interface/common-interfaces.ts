import { NextFunction, Request, Response } from "express";

interface Dict<T> { [key: string]: T };

type HttpRequest = Request;
type HttpResponse = Response;

interface Context {
    request: HttpRequest
    response: HttpResponse
    additional: Dict<any>
}

type ExpressHandler = (req: Request, res: Response, next: NextFunction) => void;
type ExpressErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => void;
type ExpressCallbackHandler = ExpressHandler | ExpressErrorHandler;
type RoutableFunction = (ctx: Context) => Promise<void>;
type InjectableFunction = (ctx: Context) => Promise<void>;
type ValidatableFunction = (ctx: Context) => Promise<void>;

interface RequestParamOptions {
    required: boolean,
    validate?: (value: any) => boolean,
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
    ExpressHandler,
    ExpressErrorHandler,
    ExpressCallbackHandler,
    RoutableFunction,
    InjectableFunction,
    ValidatableFunction,
    RequestParamOptions,
    RequestParamMetadata
}