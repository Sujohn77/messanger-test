const mongoose = require("mongoose");
const messageScheme = require("./message");

const dialogScheme = new mongoose.Schema({
    friendId: {type: Number, required: true},
    messages: {type: [messageScheme], required: true},
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model("Dialog", dialogScheme);
