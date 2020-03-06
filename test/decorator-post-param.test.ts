import { buildRouter } from "../src/index";
import express, { Router } from "express";
import path from "path";
import request from "supertest";

describe("decorator > PostParam", () => {
    test("normal behavior case", (done) => {

        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .post("/api/v1/users")
        .send({
            age: "99",
            country: "Korea",
            isAdmin: "true"
        })
        .set("Accept", "application/json")
        .expect(200)
        .then(res => {
            expect(res.body.age).toBe("99");
            expect(res.body.country).toBe("Korea");
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
        .post("/api/v1/users")
        .send({
            country: "Korea",
            isAdmin: "true"
        })
        .set("Accept", "application/json")
        .expect(400, {
            error: "'age' parameter is required. param_type: [post]"
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
        .post("/api/v1/users")
        .send({
            age: "99",
            country: "Korea",
            isAdmin: "false"
        })
        .set("Accept", "application/json")
        .expect(400, {
            error: "This api is only allowed to call by an admin user"
        }, done);
    });

    it("should be overriden by latest version of the controller", (done) => {

        let app = express();
        app.use(express.json());
        const router = Router();
        const controllerPath = path.join(__dirname, 'controller');
        buildRouter(router, "api", controllerPath);
        app.use(router);
    
        request(app)
        .post("/api/v2/users")
        .send({
            country: "Korea",
            isAdmin: "false"
        })
        .set("Accept", "application/json")
        .expect(200, done);
    });
});