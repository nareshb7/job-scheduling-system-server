const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    mobile: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        require: true,
    },
    role:{
        type: String,
        require: true,
    },
},{minimize: false, timestamps: true});


module.exports.UserModel = mongoose.model("users", userSchema)