import { Route, Context } from "../../../../src";
import { ControllerInterface } from "../../../../src/interface/controller-interface";

@Route("posts/:postId/comments", "v2")
export class PostCommentController implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "post-comment-controller-index-v2" }
        };
    }

    public async show(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "post-comment-controller-show-v2" }
        };
    }
}