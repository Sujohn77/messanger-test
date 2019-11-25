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

chatServices.findChatsByFilter = (filterValue, filterName) => {
    switch (filterName) {
        case "members":
            return Chat.findOne({ membersId: filterValue }, (err, chat) => {
                if (err) {
                    console.log(err);
                }
                return chat;
            });
        case "id":
            return Chat.find({ _id: { $in: filterValue }}, (err, chat) => {
                if (err) {
                    console.log(err);
                }
                return chat;
            });
        default:
    }
}


chatServices.findByIdAndUpdate = (chatId) => {
    return Chat.findByIdAndUpdate(chatId,{$set:{messagesId:[]}},(err) =>{
        return err;
    });
}

chatServices.addMessage = (messageId, chatId) => {
    Chat.findOneAndUpdate({_id:chatId},{$push:{messagesId:messageId}},{useFindAndModify:false},(err)=>{
        if(err){
            console.log(err);
        }
    })
}

module.exports = chatServices;