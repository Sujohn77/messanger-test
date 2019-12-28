const Message = require("../models/message");
const messageServices = {};

messageServices.createMessage = async (text,sender,chatId) => {
    return Message.create({sender,text,chatId});
}

messageServices.deleteByChatId = (chatId) => {
    return Message.remove({chatId})
}

messageServices.findMessagesByFilter = (filterValue, filterName) => {
    switch (filterName) {
        case "id":
            return Message.find({ _id: { $in: filterValue }}, (err, msg) => {
                if (err) {
                    console.log(err);
                }
                return msg;
            });
        default:
             return Message.find({ _id: { $in: filterValue }}, (err, msg) => {
                if (err) {
                    console.log(err);
                }
                return msg;
            });
    }
}

module.exports = messageServices;