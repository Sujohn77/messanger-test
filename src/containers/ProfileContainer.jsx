import React, { useState, useEffect } from "react";
import { Profile } from "../components/Profile/Profile.jsx";
import withAuthRedirect from "../hoc/withAuthRedirect";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "../redux/actionCreators/loginActionCreators";
import { addFriend, searchUsers } from "./../redux/middleWares/userThunks";
import { setAuth } from "../redux/actionCreators/authActionCreators";
import { getFilteredSearchUsers, getLastMessage, getUserForSocket } from "../redux/selectors/profile-selectors";
import { MESSAGE_SENT,USER_CONNECTED,COMMUNITY_CHAT, MESSAGE_RECIEVED } from "../Events"

import io from "socket.io-client"

const socketUrl = "http://localhost:3001"

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeChat: this.props.chats[0],
            chats: this.props.chats,
            socket: null,
        }
    }
    componentDidMount(){
        this.setUser();
    }
    componentWillMount() {
        const socket = io(socketUrl)

        socket.on("connect", () => {
            console.log("Connected");
        })
        this.setState({socket});
        
        this.resetChat(this.state.activeChat,socket);
    }

    resetChat = (chat,socket) => {
        debugger
        return this.addChat(chat, true,socket)
    }

    setUser = ()=>{
        
		const { socket } = this.state
		socket.emit(USER_CONNECTED, this.props.user);
    }
    
    addChat = (chat, reset,socket) => {
        const { chats } = this.state

        const newChats = reset ? [chat] : [...chats, chat]
        this.setState({ chats: newChats, activeChat: reset ? chat : this.state.activeChat })
        debugger
        const messageEvent = `${MESSAGE_RECIEVED}-${chat._id}`
        
        socket.on(messageEvent, this.addMessageToChat(chat._id))
    }

    addMessageToChat = (chatId) => {
        debugger
        return message => {
            debugger
            const newChats = this.chats.map((chat) => {
                if (this.state.activeChat.id === chatId)
                    this.state.activeChat.messages.push(message)
                return chat
            })

            this.state.setState({ newChats })
        }
    }

    sendMessage = (value) => {
        debugger
        this.state.socket.emit("MESSAGE_SENT", { message: value, chatId: this.state.activeChat._id });
    }

    handleSearch = (value) => {
        searchUsers(value);
    };

    logoutWithToken = () => {
        localStorage.clear();

        logout();
        setAuth(false);
    };
    render() {
        
        return <Profile {...this.props}
            activeChat={this.state.activeChat}
            addFriend={this.addFriend} sendMessage={this.sendMessage}
            logout={this.logoutWithToken} handleSearch={this.handleSearch} />
    }

};
const mapStateToProps = state => {
    return {
        searchItems: getFilteredSearchUsers(state),
        chats: state.profilePage.chats,
        lastMessage: getLastMessage(state),
        user: getUserForSocket(state)
    }
};
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { logout, addFriend, searchUsers, setAuth })
)(ProfileContainer);