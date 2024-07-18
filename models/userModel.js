const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    admin: {type: mongoose.Schema.Types.ObjectId, ref: "admin"},
    uname: {
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
    mobile: {
        type : String,
        required : [true, "contact is required"],
        minLength : [10, "contact should not have atleast 10 character long"],
        maxLength : [10, "contact should have atleast 10 character long"],
    },

});

const User = mongoose.model("user", userModel);

module.exports = User;

// 