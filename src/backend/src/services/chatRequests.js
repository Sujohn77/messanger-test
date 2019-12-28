const Chat = require("../models/chat");
const Factory = require("../Factory");

const chatServices = {};

chatServices.UpdateMembers = (userId, chatId, membersId) => {
    return Chat.updateOne({ _id: chatId, userId: userId }, { $push: { membersId: membersId } })
}

chatServices.createChat = (user, type, chatName) => {
    const chat = new Chat({ type: type, membersId: [user._id], name: chatName, messagesId: [], userId: user._id,position:null });
    chat.save();

    const firstMember = [user.firstName + " " + user.lastName];
    const newChat = Factory.chatCreator(chat.id, chat.type, firstMember, [], chat.name)

    return newChat;
}

chatServices.findOne = (name) => {
    return Chat.findOne({ name });
}

chatServices.findChatsByFilter = (filterValue, filterName) => {
    switch (filterName) {
        case "members":
            return Chat.find({ membersId: filterValue }, (err, chat) => {
                if (err) {
                    console.log(err);
                }
                return chat;
            });
        case "id":
            return Chat.find({ _id: { $in: filterValue } }, (err, chats) => {
                if (err) {
                    console.log(err);
                }
                return chats;
            });
        case "userId":
            return Chat.find({ userId: filterValue  }, (err, chats) => {
                if (err) {
                    console.log(err);
                }
                return chats;
            });
        default:
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
            return Chat.findOne({ _id: { $in: filterValue } }, (err, chat) => {
                if (err) {
                    console.log(err);
                }
                return chat;
            });
        default:
    }
}

chatServices.findByIdAndUpdate = (chatId,value,filter) => {
    switch(filter){
        case "messagesId":
            return Chat.findByIdAndUpdate(chatId, { $set: { messagesId: value || [] } }, (err) => {
                return err;
            });
        case "position":
            return Chat.findByIdAndUpdate(chatId, { $set: { position: value || 0 } }, (err) => {
                return err;
            });
        default: 
            return Chat.findByIdAndUpdate(chatId, { $set: { messagesId: value || [] } }, (err) => {
                return err;
            });
    }
}

chatServices.addMessage = (messageId, chatId) => {
    Chat.findOneAndUpdate({ _id: chatId }, { $push: { messagesId: messageId } }, { useFindAndModify: false }, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = chatServices;