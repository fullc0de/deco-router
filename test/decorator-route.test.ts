import 'reflect-metadata';
import { getStore } from '../src';

describe('decorator > Route', () => {
    it('should make proper routing information with input ', () => {

        let UserV1 = require("./controller/v1/user-controller")
        let PostV1 = require("./controller/v1/post-controller")
        let UserV2 = require("./controller/v2/user-controller")
        let PostCommentV2 = require("./controller/v2/post-comment-controller")

        let routeInfos = getStore().buildRoutes("api");

        // routeInfos.forEach((r) => {
        //     console.log(`path=${r.path}, method=${r.method}`);
        // });
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/users" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/users/:id" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/users" && r.method === "post")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/users/:id" && r.method === "put")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/users/:id" && r.method === "delete")).not.toBe(-1);

        expect(routeInfos.findIndex((r) => r.path === "/api/v1/posts" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/posts/:id" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/posts" && r.method === "post")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/posts/:id" && r.method === "put")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v1/posts/:id" && r.method === "delete")).not.toBe(-1);

        expect(routeInfos.findIndex((r) => r.path === "/api/v2/users" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/users/:id" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/users" && r.method === "post")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/users/:id" && r.method === "put")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/users/:id" && r.method === "delete")).not.toBe(-1);

        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts/:id" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts" && r.method === "post")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts/:id" && r.method === "put")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts/:id" && r.method === "delete")).not.toBe(-1);

        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts/:postId/comments" && r.method === "get")).not.toBe(-1);
        expect(routeInfos.findIndex((r) => r.path === "/api/v2/posts/:postId/comments/:id" && r.method === "get")).not.toBe(-1);

        expect(routeInfos.length).toEqual(22);
    });
});