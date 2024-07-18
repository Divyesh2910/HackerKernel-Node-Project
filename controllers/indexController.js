const Admin = require("../models/adminModel");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { sendToken } = require("../utils/sendToken");

exports.homepage = catchAsyncErrors(async(req, res, next) => {
    res.json({message: "homepage"});
});

exports.adminsignup = catchAsyncErrors(async(req, res, next) => {
    const admin = await new Admin(req.body).save();
    sendToken(admin, 201, res);
});

exports.adminsignin = catchAsyncErrors(async(req, res, next) => {
    const admin = await Admin.findOne({email: req.body.email}).select("+password").exec();

    if(!admin) return next(new ErrorHandler("User Not Found With This Email Address.", 404));

    const isMatch = admin.comparepassword(req.body.password);
    if(!isMatch){
        return next(new ErrorHandler("Wrong Credentials.", 500));
    }
    sendToken(admin, 200, res);
});

exports.adminsignout = catchAsyncErrors(async(req, res, next) => {
    res.clearCookie("token");
    res.json({message: "Successfully Signout."})

});