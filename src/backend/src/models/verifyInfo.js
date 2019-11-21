const mongoose = require("mongoose");

const verifyScheme = new mongoose.Schema({
    email: {type: String, required: true},
    code: {type: String, required: true},
}, {versionKey: false});

module.exports = mongoose.model("verifyInfo", verifyScheme);
