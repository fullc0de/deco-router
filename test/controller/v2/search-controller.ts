import { Route, Context } from "../../../src";
import { ControllerInterface } from "../../../src/interface/controller-interface";
import { Middleware } from "../../../src/decorator/middleware";
import { DecoRouterError } from "../../../src/deco-router-error";
import { ErrorMiddleware } from "../../../src/decorator/error-middleware";

@Route("search", "v2", { treatAsAction: true })
export class SearchController implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response.status(200).json({
            message: "search-controller-index-v1"
        })
    }
    public async show(ctx: Context) {
        ctx.response.status(200).json({
            message: "search-controller-show-v1"
        });
    }
    public async put(ctx: Context) {
        ctx.response.status(200).json({
            message: "search-controller-put-v1"
        });
    }
    public async post(ctx: Context) {
        ctx.response.status(200).json({
            message: "search-controller-post-v1"
        });
    }
    
    @Middleware([(req, res, next) => {
        throw new DecoRouterError(500, "middleware exception");
    }])
    @ErrorMiddleware([(err, req, res, next) => {
        res.status(500).json({
            middlewareError: err.message
        })
    }])
    public async delete(ctx: Context) {
        ctx.response.status(200).json({
            message: "search-controller-delete-v1"
        });
    }
}