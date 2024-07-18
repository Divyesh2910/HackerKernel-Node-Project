exports.sendToken = (admin, statusCode, res) => {
    const token = admin.getjwttoken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 *60 *60 *1000
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({success: true, id: admin._id, token});
    
    res.json({token});
};
// 