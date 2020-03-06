import { Route, Context } from "../../../src";
import { ControllerInterface } from "../../../src/interface/controller-interface";

@Route("posts", "v1")
export class PostController implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response.status(200).json({
            message: "post-controller-index-v1"
        })
    }
    public async show(ctx: Context) {
        ctx.response.status(200).json({
            message: "post-controller-show-v1"
        });
    }
    public async put(ctx: Context) {
        ctx.response.status(200).json({
            message: "post-controller-put-v1"
        });
    }
    public async post(ctx: Context) {
        ctx.response.status(200).json({
            message: "post-controller-post-v1"
        });
    }
    public async delete(ctx: Context) {
        ctx.response.status(200).json({
            message: "post-controller-delete-v1"
        });
    }
}