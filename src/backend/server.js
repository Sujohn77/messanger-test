require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const routerTest = require("./routes/test");
const routerRegister = require("./routes/register");
const routerLogin = require("./routes/login");

// Import my test routes into the path '/test'
const serverOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(process.env.MONGODB_URI, serverOptions).then(()=> {
    console.log("Mongo connected:");

    app.use('/',routerRegister);
    app.use('/',routerLogin);
    app.use('/',routerTest);
    console.log("Server is listening on "+process.env.PORT+" port");
    app.listen(process.env.PORT);
});

// View engine setup
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());

module.exports = app;