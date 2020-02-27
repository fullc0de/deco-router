import { MetadataStorage } from '../../src/metadata/metadata-storage';
import { Context } from '../../src';
import { InjectorInterface } from '../../src/interface/injector-interface';

class UserV1 {
    index(ctx: Context) {}
    show(ctx: Context) {}
};
class PostV1 {
    index(ctx: Context) {}
    delete(ctx: Context) {}
};
class PostV2 extends PostV1 {
    index(ctx: Context) {}
    show(ctx: Context) {}
};

class DummyInjector implements InjectorInterface {
    public async inject() {

    }
}

describe('metadata > storage', () => {
    let storage = new MetadataStorage();

    it('should make proper routing information with input ', () => {

        storage.registerRoute("users", "v1", UserV1, { userAuthInjector: new DummyInjector() });
        storage.registerRoute("posts", "v1", PostV1, { userAuthInjector: new DummyInjector() });
        storage.registerRoute("posts", "v2", PostV2, { userAuthInjector: new DummyInjector() });
        
        let routeInfos = storage.buildRoutes("api");

        expect(routeInfos.findIndex((r) => r.path === "/api/v1/users" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/users/:id" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/users" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/users/:id" && r.method === "get")).not.toBe(-1);

        expect(routeInfos.findIndex((r) => r.path === "/api/v1/posts" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/posts/:id" && r.method === "delete")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts/:id" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts/:id" && r.method === "delete")).not.toBe(-1);

        expect(routeInfos.length).toEqual(9);
    });
});