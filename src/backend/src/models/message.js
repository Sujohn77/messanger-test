const mongoose = require("mongoose");

const messageScheme = new mongoose.Schema({
    text: {type: String, required:true},
    sender: {type: String, required:true},
    chatId: {type: String, required:true},
},{ versionKey: false ,timestamps: true});

module.exports =  mongoose.model("Message", messageScheme);
