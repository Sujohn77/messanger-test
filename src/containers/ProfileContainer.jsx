import React from "react";
import { Profile } from "./../components/Profile/Profile.jsx";
import withAuthRedirect from "./../hoc/withAuthRedirect.jsx";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "./../redux/actionCreators/loginActionCreators";
import { addFriend, clearAll, searchUsers} from "./../redux/middleWares/userThunks";
import { setAuth } from "./../redux/actionCreators/authActionCreators";
import { setShowGroupCreate, updateChats, setShowGroupSettings } from "./../redux/actionCreators/profileActionCreators";

import {getUserForSocket} from "./../redux/selectors/profile-selectors";
import { MESSAGE_SENT, MESSAGE_RECIEVED } from "./../Events"

import io from "socket.io-client"
import Preloader from "./../common/Preloader.jsx";

const socketUrl = "http://localhost:3001"

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeChat: this.props.chats && this.props.chats[0],
            chats: this.props.chats,
            socket: null,
        }
    }
    componentDidMount(){
        const socket = io(socketUrl);
        this.setState({socket});
        if(this.state.activeChat){
            for(let i =0;i<this.state.chats.length;i++){
                socket.on(`${MESSAGE_RECIEVED}-${this.props.chats[i]._id}`, this.addMessageToChat(this.props.chats[i]._id))
            }
        }      
    }
    setActiveChat(chat){
        this.setState({activeChat:chat})
    }

    addMessageToChat (chatId) {
        return message => {   
            const newChats = this.props.chats.map((chat) => {
                if(chat._id === chatId){
                    chat.messages.push(message)
                }
                return chat
            })
            this.props.updateChats(newChats);
        }
    }

    sendMessage(value)  {
        const {socket} = this.state;
        const message = { text: value, sender: this.props.user.name,chatId:this.state.activeChat._id};
        
        if(value){
            const newChats = this.props.chats.map((chat) => {
                if(chat._id === this.state.activeChat._id){
                    chat.messages.push(message)
                }
                return chat
            })
            this.props.updateChats(newChats);
            
            socket.emit(MESSAGE_SENT, { text: value, chatId: this.state.activeChat._id,sender: this.props.user.name});
        }
        
    }

    handleSearch(value) {
        this.props.searchUsers(value);
    };

    logoutWithToken(){
        localStorage.clear();
        logout();
        setAuth(false);
    };
    render() {
        if(!this.props.chats)
            return <Preloader/>
            
        return <Profile {...this.props}
            setActiveChat={this.setActiveChat.bind(this)}
            activeChat={this.state.activeChat}
            addFriend={this.props.addFriend} sendMessage={this.sendMessage.bind(this)}
            logout={this.logoutWithToken.bind(this)} handleSearch={this.handleSearch.bind(this)} />
    }

};

const mapStateToProps = state => {
    return {
        user: getUserForSocket(state),
        chats: state.profilePage.chats,
    }
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { updateChats, logout, clearAll, setShowGroupCreate, setShowGroupSettings, addFriend, searchUsers, setAuth })
)(ProfileContainer);