const mongoose = require("mongoose");

const chatScheme = new mongoose.Schema({
    userId: {type: String, required: true},
    type: {type: String, required: true},
    membersId: {type: [String], required: true},
    messagesId:{type: [String], required: true},
    name:{type: String, required: false}
}, {versionKey: false});

module.exports = mongoose.model("Chat", chatScheme);
