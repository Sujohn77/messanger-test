const express = require("express");
const routes = express.Router();

const verifyToken = require("./verifyToken");

const profileController = require("./controllers/profile");
const loginController = require("./controllers/login");
const registerController = require("./controllers/register");
const testController = require("./controllers/test");

routes.post("/login", loginController.login);

routes.post("/login/auth", verifyToken, loginController.checkAuth);

routes.post("/register",registerController.sendEmail);

routes.post("/register/verify",registerController.verifyCode);

routes.post("/register/me", registerController.registerMe);

routes.post("/profile/create/:name",verifyToken,profileController.createGroup);

routes.post("/profile/add",profileController.addFriend);

routes.post("/profile/users",profileController.getUserWithName);

routes.post("/profile/chat/create/:name",verifyToken,profileController.createGroup);

routes.post("/profile/chat/addMembers",verifyToken,profileController.addMembersToChat);

// TEST ROUTES
routes.get("/users", testController.get);

routes.delete("/delete", testController.delete);

routes.delete("/delete/:firstName", testController.deleteOne);

routes.delete("/deleteDialogs", testController.clearDialogs);

module.exports = routes;