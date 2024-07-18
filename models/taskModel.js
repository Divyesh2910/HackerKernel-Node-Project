const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
    admin: {type: mongoose.Schema.Types.ObjectId, ref: "admin"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    taskName: {
        type: String,
        required: [true, "Task Name is required."],
    },
    taskType: {
        type: String,
        enum: ["Pending", "Progress", "Done"],
    },

});

const Task = mongoose.model("task", taskModel);

module.exports = Task;