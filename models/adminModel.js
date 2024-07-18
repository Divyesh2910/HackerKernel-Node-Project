const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const adminModel = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Full Name is required."],
        maxLength: [15, "Email must have more than 15 character."],
        minLength: [2, "Email must have more than 7 character."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        select: false,
        required: [true, "Password is required."],
        maxLength: [15, "Password must have more than 15 character."],
        minLength: [7, "Password must have more than 7 character."],
        // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, "Please enter valid password."]
    },
    admin: {type: mongoose.Schema.Types.ObjectId, ref: "admin"},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
}, {timestamps: true});

adminModel.pre("save", function(){
    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

// password compare
adminModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

// token generate
adminModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE,
    });
};

const Admin = mongoose.model("admin", adminModel);

module.exports = Admin;
// 