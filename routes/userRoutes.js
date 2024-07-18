const express = require("express");
const router = express.Router();
const {
    createUserAndTask,
    listUsersAndTasks,
    downloadUsersAndTasks, 
    fetchUserTasksById,

} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");


// POST /create
router.post("/create", isAuthenticated, createUserAndTask);

// GET /list
router.get("/list", isAuthenticated, listUsersAndTasks);

// GET /download

router.get("/download", isAuthenticated, downloadUsersAndTasks);

// GET /userTaskById
router.get("/tasks/:id", isAuthenticated, fetchUserTasksById)

module.exports = router
// 