//LIBRARIES
const jwt = require("jsonwebtoken");
const promifisy = require("./../utils/promisify");
//MODELS
const User = require("../models/user");
const Chat = require("../models/chat");
//SERVICES
const chatServices = require("./../services/chatRequests");
const userServices = require("./../services/userRequests");
const messageServices = require("./../services/messageRequests");

let response = require("./../response");

const profileController = {};

const verify = promifisy(jwt.verify);

profileController.addMembersToChat = async (req, res) => {
    const {userEmails,chatId} = req.body;
    const [profile] = await verify(req.token, "secretKey");

    if (profile) {
        const users = await userServices.findUsersByFilter(userEmails,"email");

        const membersId = users.map((user) => user.id);

        for (let index = 0; index < membersId.length; index++) {
            await userServices.updateChatsUser(membersId[index],chatId)
        }
        
        await chatServices.UpdateMembers(profile.user._id, chatId, membersId);
        
        response = {
            data:{},
            resultCode:0
        }

        res.status(200).json(response);
    }
};

profileController.saveScrollPositionChat = async (req, res) => {
    const {chatId, position} = req.body;

    await chatServices.findByIdAndUpdate(chatId,position,"position")

    response = {
        data:{},
        resultCode: 0
    }

    res.status(200).json(response);
}

profileController.createGroup = async (req, res) => {
    const nameGroup = req.params.name;
    const [profile] = await verify(req.token, "secretKey");

    if (profile) {
        try {
            // CHECK ON EXISTING A CHAT WITH THE SAME NAME

            const chats = await chatServices.findChatsByFilter(profile.user._id, "userId");

            let allowCreateChat = 0;
            chats.forEach((chat) => {

                if (chat.name === nameGroup && chat.type === "group") {
                    allowCreateChat++
                }
            });

            if (allowCreateChat < 1) {
                const chat = await chatServices.createChat(profile.user, "group", nameGroup);

                if (chat) {
                    await userServices.updateChatsUser(profile.user._id, chat._id);


                    response = {
                        resultCode: 0,
                        data: { chat },
                    }

                    res.status(200).json(response)
                }
            }
            else {
                response = {
                    resultCode: 1,
                    data: {},
                    message: "Group with the same name already exists"
                }

                res.status(200).json(response)
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }
};
profileController.clearChatMessages = async (req, res) => {
    const  chatId  = req.params.chatId;

    if (chatId) {
        const { errChat } = await chatServices.findByIdAndUpdate(chatId);
        const { errMessage } = await messageServices.deleteByChatId(chatId);

        if (!errChat && !errMessage) {
            response = {
                resultCode: 0,
                data: {},
            };
            res.status(200).json(response);
        }
    }
}
profileController.addFriend = async (req, res) => {
    const { friendEmail, id } = req.body;

    const myProfile = await userServices.findUserByFilter(id, "id");

    const friendProfile = await userServices.findUserByFilter(friendEmail, "email");

    let isMyFriend = false;

    if (myProfile !== null && friendProfile !== null) {
        myProfile.chatsId.forEach(item => {
            if (item === friendProfile._id) {
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
                return Chat.create({ type: "dialog", membersId: [myProfile.id, friendProfile.id], messagesId: [],position:null}, async (err, chat) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    // ADD CHAT ID TO MY LIST OF CHATS ID
                    myProfile.chatsId = Array.from(new Set([...myProfile.chatsId, chat.id]));
                    // ADD FRIEND TO FRIEND LIST
                    myProfile.friendsId = Array.from(new Set([...myProfile.friendsId, friendProfile.id]));
                    await myProfile.save();

                    // ADD CHAT ID TO FRIEND'S LIST OF CHATS ID
                    friendProfile.chatsId = Array.from(new Set([...friendProfile.chatsId, chat.id]));
                    // ADD TO FRIEND LIST ME
                    friendProfile.friendsId = Array.from(new Set([...friendProfile.friendsId, myProfile.id]));
                    await friendProfile.save();

                    const dialogNewFriend = { name: friendProfile.firstName + " " + friendProfile.lastName, messages: [] }

                    const friendList = await userServices.getFriends(myProfile.friendsId || []);
                    const newFriendList = friendList.map((user) =>{
                        return {fullName: user.firstName + " " + user.lastName,email:user.email,_id:user.id}
                    });

                    response = {
                        resultCode: 0,
                        data: { dialogNewFriend, friendList:newFriendList }
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

profileController.getPortionMessages = async(req, res) => {
    const chatId = req.params.chatId;
    const {startIndex,endIndex} = req.body

    const chat = await chatServices.findChatByFilter(chatId,"id");
    const messages = await messageServices.findMessagesByFilter(chat.messagesId,"id");

    let filterMessages;
    let hasNewPage = true;
    if(endIndex >= messages.length){
         filterMessages = messages.slice(startIndex,messages.length);
         hasNewPage = false;
    }
    else{
        filterMessages = messages.slice(startIndex,endIndex);
    }
    
    const response = {
        data:{
            messages:filterMessages,
            hasNewPage
        },
        resultCode:0
    }

    res.status(200).json(response);
}

module.exports = profileController;