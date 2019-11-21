const Chat = require("../models/chat");

const userServices = require("./../services/userRequests");

const chatServices = {};

chatServices.createChat = async (id, friendId, type, myProfile, friendProfile) => {
    const chat = await chatServices.findChatByFilter([id, friendId], "members");

    if (chat == null) {
       return Chat.create({ type: type, membersId: [id, friendId] }, async (err, chat) => {

            if (err) {
                console.log(err);
                return false;
            }

            if (chat !== undefined && chat !== null && !err) {
                const newProfile = await userServices.updateChatsUser(myProfile.id, chat.id);

                const newfriendProfile = await userServices.updateChatsUser(friendProfile.id, chat.id);

                if (newProfile && newfriendProfile) {
                    return true;
                }

            }
        });

    }
    else {
        return false;
    }

}

chatServices.findChatByFilter = (filterValue, filterName) => {
    switch (filterName) {
        case "members":
            return Chat.findOne({ membersId: filterValue }, (err, chat) => {
                if (err) {
                    console.log(err);
                }
                return chat;
            });
        case "id":
            return Chat.findById(filterValue, (err, chat) => {
                if (err) {
                    console.log(err);
                }
                return chat;
            });
    }
}

module.exports = chatServices;