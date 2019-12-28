require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const routes = require("./src/routes");
const SocketManager = require("./SocketManager");

const serverOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connect(process.env.MONGODB_URI, serverOptions).then(() => {
  console.log("Mongo connected:");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (res, req) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
app.use("/", routes);

// io.set("origins", "*");
io.on("connection", SocketManager);

server.listen(process.env.PORT);
console.log("Server is listening on " + process.env.PORT || 3001 + " port");

module.exports.io = io;
module.exports = app;
