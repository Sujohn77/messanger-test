require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
// , { origins: '*:*'}
const routes = require("./src/routes");
const SocketManager = require("./SocketManager");
// const io = require("socket.io")(server);

const serverOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(process.env.MONGODB_URI, serverOptions).then(()=> {
    console.log("Mongo connected:");
});

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
app.use("/",routes);

// io.set("origins", "*");
io.on("connection", SocketManager);

server.listen(process.env.PORT);
console.log("Server is listening on "+process.env.PORT+" port");


module.exports.io = io;
module.exports = app;