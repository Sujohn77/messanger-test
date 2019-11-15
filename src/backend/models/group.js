const mongoose = require("mongoose");

const groupScheme = new mongoose.Schema({
    name: {type: String, required:true},
    members: {type: [String], required:true},
},{ versionKey: false });

module.exports =  mongoose.model("Group", groupScheme);
