//LIBRARIES
const jwt = require("jsonwebtoken");
const promifisy = require("./../utils/promisify");
//MODELS
const User = require("../models/user");
//SERVICES
const chatServices = require("./../services/chatRequests");
const userServices = require("./../services/userRequests");
const messageServices = require("./../services/messageRequests");

const Factory = require("../Factory")
let response = require("./../response");

const loginController = {};

const jwtVerify = promifisy(jwt.verify);
loginController.login = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email, password: password }, (err, user) => {
        if (err) {
            console.log(err)
        }

        if (user) {
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
        else {
            response = {
                resultCode: 1,
                data: {},
                message: "Email or password is wrong"
            };
            res.status(400).json(response);
        }
    });
};

loginController.checkAuth = async (req, res) => {
    try {
        const [userInfo]  = await jwtVerify(req.token, "secretKey");

        const myProfile = await userServices.findUserByFilter(userInfo.user.email, "email");

        const _id = myProfile.id;

        const user = { email: myProfile.email, password: myProfile.password, firstName: myProfile.firstName, lastName: myProfile.lastName }
        const friendList = await userServices.getFriends(myProfile.friendsId || []);
        const newFriendList = friendList.map((user) =>{
            return {fullName: user.firstName + " " + user.lastName,email:user.email,_id:user.id}
        });
        const chatsId = [];
        
        for(let i = 0;i < myProfile.chatsId.length;i++){
            chatsId[i] = myProfile.chatsId[i];
        }
        const chatsWithIds = await chatServices.findChatsByFilter(chatsId,"id");

        const chats = [];

        let chatName;
        if (chatsWithIds) {
            for (let chat of chatsWithIds) {
                if(chat.type === "dialog"){
                    for (let item of chat.membersId) {
                        if (item !== myProfile.id) {
                            const user = await userServices.findUserByFilter(item, "id");
                            chatName = user.firstName + " " + user.lastName;
                            break;
                        }
                    }
                }
                else{
                    chatName = chat.name
                }
                const users = await userServices.findUsersByFilter(chat.membersId,"id");
                const messages = await messageServices.findMessagesByFilter(chat.messagesId,"id"); 
                const members = users.map((user => `${user.firstName}" "${user.lastName}`));

                const newChat = Factory.chatCreator(chat._id,chat.type, members,messages,chatName);

                chats.push(newChat);
            }
            response = {
                resultCode: 0,
                data: { user, _id, chats, friendList:newFriendList }
            };
    
            res.status(200).json(response);
        }
    }
    catch (e) {
        console.log(e);
    }
};

module.exports = loginController;