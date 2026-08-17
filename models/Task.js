const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "DONE"],
            default: "TODO"
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            default: "MEDIUM"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);