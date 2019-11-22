//LIBRARIES
const jwt = require("jsonwebtoken");
//MODELS
const User = require("../models/user");
//SERVICES
const chatServices = require("./../services/chatRequests");
const userServices = require("./../services/userRequests");

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
    jwt.verify(req.token, "secretKey", async (err, userInfo) => {
        if (err) {
            console.log(err)
        } else {
            const myProfile = await userServices.findUserByFilter(userInfo.user.email, "email");

            const _id = myProfile.id;
            const user = { email: myProfile.email, password: myProfile.password, firstName: myProfile.firstName, lastName: myProfile.lastName }

            const chatsId = myProfile.chatsId[0];

            const chatsWithIds = await chatServices.findChatByFilter(chatsId, "id");
            for (item of chatsWithIds.membersId) {
                if (item != myProfile.id) {
                    const user = await userServices.findUserByFilter(item, "id");
                    chatsWithIds.name = user.firstName + " " + user.lastName;
                }
            }
            chatsWithIds.save();

            let query = "";
            if(chatsWithIds.messagesId.length > 0){
                chatsWithIds.messagesId.forEach(element => {
                    if(chatsWithIds.messagesId[chatsWithIds.membersId.length -1] == element){
                        query += `{_id:${element}}`
                    }
                    else{
                        query += `{_id:${element}},`
                    }
                });
                console.log(query);
            
                Message.find( { $or:[ query]},(err,msgs) => {
                    if(err){
                        console.log(err);
                    }
                    const chats = {_id: chatsWithIds._id,type:chatsWithIds.type,membersId: chatsWithIds.membersId, name: chatsWithIds.name,messages:msgs}

                    response = {
                        resultCode: 0,
                        data: { user, _id, chats }
                    };
        
                    res.status(200).json(response);
                })
            }  
            else{
                const chats = {_id: chatsWithIds._id,type:chatsWithIds.type,membersId: chatsWithIds.membersId, name: chatsWithIds.name,messages:[]}
                response = {
                    resultCode: 0,
                    data: { user, _id, chats }
                };
    
                res.status(200).json(response);
                
            }
        }
    });
};

module.exports = loginController;