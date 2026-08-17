const request = require("supertest");
const app = require("../app");

describe("Health Check API", () => {

    test("GET / should return API running message", async () => {

        const response = await request(app)
            .get("/");

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe("TaskFlow API is running!");
    });

});