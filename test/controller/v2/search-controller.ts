import { Route, Context } from "../../../src";
import { ControllerInterface } from "../../../src/interface/controller-interface";

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
    public async delete(ctx: Context) {
        ctx.response.status(200).json({
            message: "search-controller-delete-v1"
        });
    }
}