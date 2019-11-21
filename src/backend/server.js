require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const routes = require("./src/routes");

const app = express();

const server = require('http').Server(app);
// const io = require('socket.io')(server);

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

app.listen(process.env.PORT);
console.log("Server is listening on "+process.env.PORT+" port");

// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });

module.exports = app;