const Message = require("../models/message");

const messageServices = {};

messageServices.createMessage =  (text,sender,chatId) => {
    const msg = new Message(sender,text,chatId);
    msg.save();
    return msg
}

module.exports = messageServices;