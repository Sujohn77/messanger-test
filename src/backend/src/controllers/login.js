//LIBRARIES
const jwt = require("jsonwebtoken");
const promifisy = require("./../utils/promisify");
//MODELS
const User = require("../models/user");
//SERVICES
const chatServices = require("./../services/chatRequests");
const userServices = require("./../services/userRequests");
const messageServices = require("./../services/messageRequests");

let response = require("./../response");

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email, password: password }, (err, user) => {
        if (err) {
            console.log(err)
        }

        if (user === null) {
            response = {
                resultCode: 1,
                data: {},
                message: "Email or password is wrong"
            };
            res.status(400).json(response);
        }
        else {
            jwt.sign({ user: user }, "secretKey", (err, token) => {
                if (err) {
                    console.log(err);
                }
                response = {
                    resultCode: 0,
                    data: { user, token }
                };

                res.status(200).json(response)
            });
        }


    });
};

loginController.checkAuth = async (req, res) => {
    const jwtVerify = promifisy(jwt.verify);
    try {
        const [userInfo]  = await jwtVerify(req.token, "secretKey");

        const myProfile = await userServices.findUserByFilter(userInfo.user.email, "email");

        const _id = myProfile.id;
        const user = { email: myProfile.email, password: myProfile.password, firstName: myProfile.firstName, lastName: myProfile.lastName }

        const chatsId = myProfile.chatsId;

        const chatsWithIds = await chatServices.findChatsByFilter(chatsId,"id");

        const chats = [];
        const newChat = {};
        if (chatsWithIds) {
            for (let chat of chatsWithIds) {
                
                for (let item of chat.membersId) {
                    if (item !== myProfile.id) {
                        const user = await userServices.findUserByFilter(item, "id");
                        newChat.name = user.firstName + " " + user.lastName;
                        break;
                    }
                }

                const users = await userServices.findUsersByFilter(chat.membersId,"id");

                newChat.members = users.map((user => `${user.firstName}" "${user.lastName}`))
                newChat.messages = await messageServices.findMessagesByFilter(chat.messagesId,"id"); 
                newChat.type = chat.type;
                newChat._id = chat._id;

                chats.push(newChat);
            }
        }

        response = {
            resultCode: 0,
            data: { user, _id, chats }
        };

        res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
    }
};

module.exports = loginController;