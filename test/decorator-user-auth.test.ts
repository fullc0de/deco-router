import { buildRouter } from "../src/index";
import express, { Router } from "express";
import path from "path";
import request from "supertest";

describe("decorator > UserAuth", () => {
    test("TestAuthInjector should add 'token' key with 'injected' value to a response body", (done) => {

        const app = express();
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);

        request(app)
        .get("/api/v1/auth")
        .set("Accept", "application/json")
        .expect(200, {
            token: "injected"
        }, done);
    });
});