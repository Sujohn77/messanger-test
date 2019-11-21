const Dialog = require("../models/dialog");

const dialogServices = {};

dialogServices.getDialog = async (chatId) => {
  return  Dialog.find({chatId},(dialog)=>{
        return dialog;
    });
}

module.exports = dialogServices;