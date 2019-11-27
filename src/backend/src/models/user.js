const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    chatsId: {type: [String], required: true},
    friendsId: {type: [String], required: true},
}, {versionKey: false});

module.exports = mongoose.model("User", userScheme);
