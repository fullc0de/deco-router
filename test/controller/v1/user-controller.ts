import { Route, Context, PostParam } from "../../../src";
import { ControllerInterface } from "../../../src/interface/controller-interface";

@Route("users", "v1")
export class UserController implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response.status(200).json({
            message: "user-controller-index-v1"
        });
    }
    public async show(ctx: Context) {
        ctx.response.status(200).json({
            message: "user-controller-show-v1"
        });
    }
    public async put(ctx: Context) {
        ctx.response.status(200).json({
            message: "user-controller-put-v1"
        });
    }
å
    @PostParam("age", { 
        required: true,
        validate: (value) => (Number(value) > 10),
        errorMessage: "A person who is over 10 years old is only permitted"
    })
    @PostParam("country", { required: false })
    @PostParam("isAdmin", { 
        required: true,
        validate: (value) => value == "true",
        errorMessage: "This api is only allowed to call by an admin user"
    })
    public async post(ctx: Context) {
        ctx.response.status(200).json({
            message: "user-controller-post-v1",
                age: ctx.request.body.age,
                country: ctx.request.body.country,
                isAdmin: ctx.request.body.isAdmin
        });
    }
    public async delete(ctx: Context) {
        ctx.response.status(200).json({
            message: "user-controller-delete-v1"
        });
    }
}