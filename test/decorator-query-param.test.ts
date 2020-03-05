import { buildRouter } from "../src/index";
import express, { Router } from "express";
import path from "path";
import request from "supertest";

describe("decorator > QueryParam", () => {
    test("normal behavior case", (done) => {

        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .get("/api/v2/posts/111/comments/22?filter=interest&category=game&isAdmin=true")
        .set("Accept", "application/json")
        .expect(200)
        .then(res => {
            expect(res.body.filter).toBe("interest");
            expect(res.body.category).toBe("game");
            expect(res.body.isAdmin).toBe("true");
            done();
        });
    });

    test("absent mandatory param", (done) => {

        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .get("/api/v2/posts/111/comments/22?filter=interest&isAdmin=true")
        .set("Accept", "application/json")
        .expect(400, {
            error: "'category' parameter is required. param_type: [query]"
        }, done);
    });

    test("validate param if needed", (done) => {

        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .get("/api/v2/posts/111/comments/22?filter=interest&category=game&isAdmin=false")        
        .set("Accept", "application/json")
        .expect(400, {
            error: "This api is only allowed to call by an admin user"
        }, done);
    });
});