const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const Task = require("../models/taskModel");
const errorHandler = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");
const json2xls = require("json2xls");


exports.createUserAndTask = catchAsyncErrors(async(req, res, next) => {
    const { admin, uname, email, mobile, taskName, taskType } = req.body;
    const user = await User.create({ admin, uname, email, mobile });

    const task = await Task.create({ user: user._id, taskName: taskName, taskType: taskType });

    res.status(201).json({ success: true, user, task });
});

exports.listUsersAndTasks = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();
    const tasks = await Task.find();
    res.status(200).json({ success: true, users, tasks });
});
// 


exports.downloadUsersAndTasks = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    const tasks = await Task.find();

    const data = [];

    users.forEach(user => {
        const userTasks = tasks.filter(task => task.user.toString() === user._id.toString());
        userTasks.forEach(task => {
            data.push({
                userId: user._id.toString(),
                admin: user.admin,
                uname: user.uname,
                email: user.email,
                mobile: user.mobile,
                taskId: task._id.toString(),
                taskName: task.taskName,
                taskType: task.taskType
            });
        });
    });

    const xls = json2xls(data);
    const filePath = path.join(__dirname, '..', 'downloads', 'users_and_tasks.xlsx');
    fs.writeFileSync(filePath, xls, 'binary');

    res.setHeader('Content-Disposition', 'attachment; filename="users_and_tasks.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.download(filePath, 'users_and_tasks.xlsx', (err) => {
        if (err) {
            next(err);
        } else {
            fs.unlinkSync(filePath);
        }
    });
});

exports.fetchUserTasksById = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    const tasks = await Task.find({ user: userId });

    res.status(200).json({ success: true, tasks });
});





