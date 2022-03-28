const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        // required: true
    },
    email: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        // required: true
    },
    dob: {
        type: Date, default: Date.now,
        required: true
    },
    jobtype: {
        type: String,
    },
    location: {
        type: String,
    },
})

const Users = new mongoose.model("Users", userSchema)

module.exports = Users;