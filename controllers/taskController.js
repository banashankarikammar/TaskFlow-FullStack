const Task = require("../models/Task");

// Create task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create task",
            error: error.message
        });
    }
};

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
};

// Get single task
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({
            message: "Invalid task ID",
            error: error.message
        });
    }
};

// Update task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update task",
            error: error.message
        });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete task",
            error: error.message
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};