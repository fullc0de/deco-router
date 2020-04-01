import { Route, Context } from "../../../src";
import { ControllerInterface } from "../../../src/interface/controller-interface";
import { UserController as V1 } from '../v1/user-controller';
import { Middleware } from "../../../src/decorator/middleware";
import { ErrorMiddleware } from "../../../src/decorator/error-middleware";
import { testMiddleware, drainMiddleware, afterMiddleware } from "../../test-middleware";
import { DecoRouterError } from "../../../src/deco-router-error";

@Route("users", "v2")
export class UserController extends V1 implements ControllerInterface {
    @Middleware([drainMiddleware])
    public async index(ctx: Context) {
        ctx.response.status(200).json({
            message: "user-controller-index-v2"
        });
    }

    @Middleware([testMiddleware])
    public async show(ctx: Context) {
        ctx.response.status(200).json({
            message: "user-controller-show-v2",
            middlewareMessage: (ctx.request as any).test
        });
    }

    @Middleware([afterMiddleware], "after")
    @ErrorMiddleware([(err, req, res, next) => {
        (req as any).errorMessage = "error";
    }])
    public async put(ctx: Context) {
        (ctx.request as any).message = "user-controller-post-v2"
    }

    @ErrorMiddleware([(err, req, res, next) => {
        res.status(500).json({
            errorMessage: err.message
        })
    }])
    public async delete(ctx: Context) {
        throw new DecoRouterError(500, "delete-error");
    }

    public async post(ctx: Context) {
        ctx.response.status(200).json({
            message: "user-controller-post-v2",
            age: ctx.request.body.age,
            country: ctx.request.body.country,
            isAdmin: ctx.request.body.isAdmin
        });
    }
}