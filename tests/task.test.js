require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

let createdTaskId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("Task API Integration Tests", () => {

    // CREATE
    test("POST /api/tasks - should create a new task", async () => {

        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Automated API Test Task",
                description: "Created using Jest and Supertest",
                priority: "HIGH",
                status: "TODO"
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.message)
            .toBe("Task created successfully");

        expect(response.body.task).toHaveProperty("_id");

        expect(response.body.task.title)
            .toBe("Automated API Test Task");

        createdTaskId = response.body.task._id;
    });


    // READ ALL
    test("GET /api/tasks - should return all tasks", async () => {

        const response = await request(app)
            .get("/api/tasks");

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body))
            .toBe(true);
    });


    // READ ONE
    test("GET /api/tasks/:id - should return the created task", async () => {

        const response = await request(app)
            .get(`/api/tasks/${createdTaskId}`);

        expect(response.statusCode).toBe(200);

        expect(response.body._id)
            .toBe(createdTaskId);

        expect(response.body.title)
            .toBe("Automated API Test Task");
    });


    // UPDATE
    test("PUT /api/tasks/:id - should update the task", async () => {

        const response = await request(app)
            .put(`/api/tasks/${createdTaskId}`)
            .send({
                title: "Updated API Test Task",
                priority: "MEDIUM",
                status: "IN_PROGRESS"
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe("Task updated successfully");

        expect(response.body.task.title)
            .toBe("Updated API Test Task");

        expect(response.body.task.status)
            .toBe("IN_PROGRESS");
    });


    // DELETE
    test("DELETE /api/tasks/:id - should delete the task", async () => {

        const response = await request(app)
            .delete(`/api/tasks/${createdTaskId}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe("Task deleted successfully");
    });


    // VERIFY DELETE
    test("GET /api/tasks/:id - should return 404 after deletion", async () => {

        const response = await request(app)
            .get(`/api/tasks/${createdTaskId}`);

        expect(response.statusCode).toBe(404);

        expect(response.body.message)
            .toBe("Task not found");
    });


    // NEGATIVE TEST
    test("POST /api/tasks - should reject task without title", async () => {

        const response = await request(app)
            .post("/api/tasks")
            .send({
                description: "Task without title",
                priority: "HIGH",
                status: "TODO"
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe("Failed to create task");
    });
        //INVALID PRIORITY
test("POST /api/tasks - should reject invalid priority", async () => {

    const response = await request(app)
        .post("/api/tasks")
        .send({
            title: "Invalid Priority Task",
            description: "Testing validation",
            priority: "URGENT",
            status: "TODO"
        });

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
        .toBe("Failed to create task");
});

//INVALID STATUS
test("POST /api/tasks - should reject invalid status", async () => {

    const response = await request(app)
        .post("/api/tasks")
        .send({
            title: "Invalid Status Task",
            description: "Testing validation",
            priority: "HIGH",
            status: "STARTED"
        });

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
        .toBe("Failed to create task");
});

//EMPTY TITLE
test("POST /api/tasks - should reject empty title", async () => {

    const response = await request(app)
        .post("/api/tasks")
        .send({
            title: "",
            description: "Testing empty title",
            priority: "MEDIUM",
            status: "TODO"
        });

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
        .toBe("Failed to create task");
});

//INVALID ID
test("GET /api/tasks/:id - should reject invalid task ID", async () => {

    const response = await request(app)
        .get("/api/tasks/invalid-id");

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
        .toBe("Invalid task ID");
});



});