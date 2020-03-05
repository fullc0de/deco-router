import { Route, Context, UserAuth } from "../../../src";
import { ControllerInterface } from "../../../src/interface/controller-interface";
import { TestAuthInjector } from "../../test-auth-injecter";

@Route("auth", "v1")
@UserAuth(new TestAuthInjector())
export class AuthController implements ControllerInterface {
    public async index(ctx: Context) {
        ctx.response = {
            statusCode: 200,
            body: { token: ctx.additional["token"] }
        };
    }
}