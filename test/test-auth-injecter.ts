import { Context } from "../src/interface/common-interfaces";
import { InjectorInterface } from "../dist/interface/injector-interface";

export class TestAuthInjector implements InjectorInterface {

    public async inject(ctx: Context) {
        ctx.additional["token"] = "injected";
    }
}