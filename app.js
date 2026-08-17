const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "TaskFlow API is running!"
    });
});

// Task routes
app.use("/api/tasks", taskRoutes);

module.exports = app;