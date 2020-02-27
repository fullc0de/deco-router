import { Route, Context } from "../../../../src";
import { ControllerInterface } from "../../../../src/interface/controller-interface";
import { UserController as V1 } from '../v1/user-controller';

@Route("users", "v2")
export class UserController extends V1 implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "user-controller-index-v2" }
        };
    }

    public async show(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { message: "user-controller-show-v2" }
        };
    }
}