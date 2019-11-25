const chatServices = require("./src/services/chatRequests");
// const io = require("socket.io")(server);

const { MESSAGE_RECIEVED, MESSAGE_SENT,} = require("../Events")

const messageServices = require("./src/services/messageRequests.js");


module.exports = function(socket){
					
	// console.log("\x1bc"); //clears console
	console.log("Socket Id:" + socket.id);


	//User Connects with username
	// socket.on(USER_CONNECTED, (user)=>{
	// 	connectedUsers = addUser(connectedUsers, user)
	// 	socket.user = user


	// 	io.emit(USER_CONNECTED, connectedUsers)
	// 	console.log(connectedUsers);
	// })
	//User disconnects
	// socket.on("disconnect", ()=>{
	// 	if("user" in socket){
	// 		connectedUsers = removeUser(connectedUsers, socket.user.name)

	// 		io.emit(USER_DISCONNECTED, connectedUsers)
	// 		console.log("Disconnect", connectedUsers);
	// 	}
	// })


	//User logsout
	// socket.on(LOGOUT, ()=>{
	// 	connectedUsers = removeUser(connectedUsers, socket.user.name)
	// 	io.emit(USER_DISCONNECTED, connectedUsers)
	// 	console.log("Disconnect", connectedUsers);
	// })

	socket.on(MESSAGE_SENT, async({chatId, text,sender})=>{
		const message = await messageServices.createMessage(text, sender,chatId);
		chatServices.addMessage(message._id,chatId);
		socket.broadcast.emit(`${MESSAGE_RECIEVED}-${chatId}`, message);
	})

}
