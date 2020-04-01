import express, { Router } from "express";
import path from "path";
import { buildRouter } from "../src";
import request from "supertest";

describe("decorator > ErrorMiddleware", () => {
    it("should handle an error from main request handler", (done) => {
        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .delete("/api/v2/users/11")
        .set("Accept", "application/json")
        .expect(500)
        .then(res => {
            expect(res.body.errorMessage).toBe("delete-error");
            done();
        });
    });


    it("should handler an error from other Middleware", (done) => {
        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .delete("/api/v2/search")
        .set("Accept", "application/json")
        .expect(500)
        .then(res => {
            expect(res.body.middlewareError).toBe("middleware exception");
            done();
        });
    });
});