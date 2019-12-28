const chatServices = require("./src/services/chatRequests");
// const io = require("socket.io")(server);

const { MESSAGE_RECIEVED, MESSAGE_SENT,} = require("../Events")

const messageServices = require("./src/services/messageRequests.js");


module.exports = function(socket){
					
	console.log("Socket Id:" + socket.id);

	socket.on(MESSAGE_SENT, async({chatId, text,sender})=>{
		const message = await messageServices.createMessage(text, sender,chatId);
		chatServices.addMessage(message._id,chatId);
		socket.broadcast.emit(`${MESSAGE_RECIEVED}-${chatId}`, message);
	})

}
