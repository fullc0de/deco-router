import express, { Router } from "express";
import path from "path";
import { buildRouter } from "../src";
import request from "supertest";

describe("decorator > Middleware", () => {
    test("test middleware", (done) => {
        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .get("/api/v2/users/11")
        .set("Accept", "application/json")
        .expect(200)
        .then(res => {
            expect(res.body.middlewareMessage).toBe("test-middleware");
            done();
        });
    });

    test("drain middleware", (done) => {
        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .get("/api/v2/users")
        .set("Accept", "application/json")
        .expect(404, done);
    });

    test("after middleware", (done) => {
        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .put("/api/v2/users/11")
        .set("Accept", "application/json")
        .expect(200)
        .then(res => {
            expect(res.body.message).toBe("user-controller-post-v2");
            expect(res.body.afterMessage).toBe("after-middleware");
            done();
        });
    });
});