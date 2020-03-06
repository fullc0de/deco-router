import { Route, Context, QueryParam } from "../../../src";
import { ControllerInterface } from "../../../src/interface/controller-interface";

@Route("posts/:postId/comments", "v2")
export class PostCommentController implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response.status(200).json({
            message: "post-comment-controller-index-v2"
        });
    }

    @QueryParam("filter", { required: false })
    @QueryParam("category", { required: true })
    @QueryParam("isAdmin", { 
        required: true,
        validate: (boolString) => boolString === "true",
        errorMessage: "This api is only allowed to call by an admin user"
    })
    public async show(ctx: Context) {
        ctx.response.status(200).json({
            message: "post-comment-controller-show-v2",
            filter: ctx.request.query.filter,
            category: ctx.request.query.category,
            isAdmin: ctx.request.query.isAdmin
        });
    }
}