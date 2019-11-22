//LIBRARIES
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
//MODELS
const User = require("../models/user");
const Chat = require("../models/chat");
//SERVICES
const chatServices = require("./../services/chatRequests");
const userServices = require("./../services/userRequests");

let response = require("./../response");

const profileController = {};

profileController.createGroup = async (req, res) => {
    const nameGroup = req.params.name;
    const token = req.token;

    console.log("bearerHeader " + token);
    console.log("nameGroup " + nameGroup);

    jwt.verify(token, "secretKey", (err, user) => {
        if (err) {
            response = {
                resultCode: 1,
                data: {},
                message: "Failed verify user token"
            };
            res.status(400).json(response);
        }

        Group.findOne({ nameGroup }, (err, group) => {
            if (err) {
                response = {
                    resultCode: 1,
                    data: {},
                    message: "Bad Request"
                };
                res.status(400).json(response);
            }

            if (group === null) {
                Group.create({ name: nameGroup, members: [user.name], messages: [], emailOwner: user.email }, (err) => {
                    if (err) {
                        response = {
                            resultCode: 1,
                            data: {},
                            message: "Bad Request"
                        };
                        res.sendStatus(400).json(response);
                    }
                });
                response = {
                    resultCode: 0,
                    data: {},
                };
                res.status(200).json(response);
            }
        });
    });
};

profileController.addFriend = async (req, res) => {
    const { friendEmail, id } = req.body;

    const myProfile = await userServices.findUserByFilter(id, "id");

    const friendProfile = await userServices.findUserByFilter(friendEmail, "email");

    const isMyFriend = false;

    if (myProfile !== null && friendProfile !== null) {
        myProfile.chatsId.forEach(item => {
            if (item == friendProfile._id) {
                isMyFriend = true;
            }
        });
        if (isMyFriend) {
            response = {
                resultCode: 1,
                data: {},
                message: "Friend've already registered"
            };
            res.status(200).json(response);
        }
        else {
            const chat = await chatServices.findChatByFilter([myProfile.id, friendProfile.id], "members");

            if (chat == null) {
                return Chat.create({ type: "dialog", membersId: [myProfile.id, friendProfile.id], messagesId: [] }, async (err, chat) => {

                    if (err) {
                        console.log(err);
                        return false;
                    }

                    myProfile.chatsId = Array.from(new Set([...myProfile.chatsId, chat.id]));
                    await myProfile.save();

                    friendProfile.chatsId = Array.from(new Set([...friendProfile.chatsId, chat.id]));
                    await friendProfile.save();
                    
                    const dialogNewFriend = { chatName: friendProfile.firstName + " " + friendProfile.lastName, messages: [] }

                    response = {
                        resultCode: 0,
                        data: { dialogNewFriend }
                    };

                    res.status(200).json(response);
                });
            }
        }
    }
};

profileController.getUserWithName = async (req, res) => {
    const { firstName, lastName } = req.body

    const query = { $and: [{ firstName: { $regex: "^" + firstName, $options: 'i' } }, { lastName: { $regex: "^" + lastName, $options: 'i' } }] }

    User.find(query, (err, users) => {
        if (err) {
            console.log(err);
        }
        response = {
            resultCode: 0,
            data: { users }
        };
        res.status(200).json(response);
    });
};

module.exports = profileController;