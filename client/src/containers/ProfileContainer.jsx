// LIBRARIES
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import io from "socket.io-client"
import { Redirect } from "react-router-dom";
// COMPONENTS
import withAuthRedirect from "./../hoc/withAuthRedirect.jsx";
import { Profile } from "./../components/Profile/Profile.jsx";
// ACTION CREATORS
import { logout } from "./../redux/actionCreators/loginActionCreators";
import { updateMessages } from "./../redux/actionCreators/messageActionCreators";
import { setAuth } from "./../redux/actionCreators/authActionCreators";
import { setShowGroupCreate, updateChats, setShowGroupSettings, setActiveChatId } from "./../redux/actionCreators/profileActionCreators";
// MIDDLEWARES
import { addFriend, clearAll} from "./../redux/middleWares/userThunks";
import { searchUsers } from "./../redux/middleWares/profile";
// SELECTORS
import { getUserForSocket } from "./../redux/selectors/profile-selectors"
// OTHERS
import { MESSAGE_SENT, MESSAGE_RECIEVED } from "./../Events";

const socketUrl = "http://localhost:3001"

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeChat: this.props.chats && this.props.chats[0],
            chats: this.props.chats,
            socket: null,
            scrollAfterAddMessage:false,
            startIndexMessagesLoaded:null,
            endIndexMessagesLoaded:null
        }
    }
    componentDidMount(){
        const socket = io(socketUrl);
        this.setState({socket});
            
        if(this.props.chats && this.props.chats.length > 0){
            if(this.state.activeChat){
                for(let i =0;i<this.state.chats.length;i++){
                    socket.on(`${MESSAGE_RECIEVED}-${this.props.chats[i]._id}`, this.addMessageToChat(this.props.chats[i]._id))
                }
            }      
            
            this.setActiveChat(this.state.activeChat);
            this.setActualMessageIndexes(this.state.activeChat);
        }
        
        
    }
    setActiveChat(chat){
        this.setState({activeChat:chat})
        
        this.props.setActiveChatId(chat._id);

        this.setActualMessageIndexes(chat);
    }

    setActualMessageIndexes(chat){
        let actualStartIndex = 0;

        if(chat.position && chat.position > 0){
            actualStartIndex = Math.ceil(chat.position / 62);
        }
        
        
        this.setState({startIndexMessagesLoaded:actualStartIndex});

        this.setState({endIndexMessagesLoaded:actualStartIndex+17});
    }

    setStartActual(value){
        this.setState({startIndexMessagesLoaded:value});
    }

    setEndActual(value){
        this.setState({endIndexMessagesLoaded:value});
    }

    addMessageToChat (chatId) {
        return message => {   
            this.props.list.push(message);
            const newChats = this.props.chats.map((chat) => {
                if(chat._id === chatId){
                    
                    chat.lastMessage = message;
                    chat.length += 1;
                }
                return chat
            })
            // UPDATE LAST MESSAGE OF CHAT
            this.props.updateChats(newChats);
            // SHOW MY NEW MESSAGE 
            this.props.updateMessages([...this.props.list,message]);
            //  SCROLLTOP OF CHAT MESSAGES
            if(this.state.activeChat.length > 14){
                this.setState({offsetTop:true});
            }
            this.setState({endIndexMessagesLoaded:this.state.endIndexMessagesLoaded+1});
        }
    }

    setScroll(value){
        this.setState({scrollAfterAddMessage:value});
    }

    sendMessage(value)  {
        const {socket} = this.state;
        const message = { text: value, sender: this.props.user.name,chatId:this.state.activeChat._id};
        
        if(value){
            const newChats = this.props.chats.map((chat) => {
                if(chat._id === this.state.activeChat._id){
                    chat.lastMessage = message;
                    chat.length += 1;
                }
                return chat
            })
            // UPDATE LAST MESSAGE OF CHAT
            this.props.updateChats(newChats);
            // SHOW MY NEW MESSAGE 
            this.props.updateMessages([...this.props.list,message]);
            // SHOW MESSAGE FOR ALL SUBSRIBERS
            socket.emit(MESSAGE_SENT, { text: value, chatId: this.state.activeChat._id,sender: this.props.user.name});
            //  SCROLLTOP OF CHAT MESSAGES
            if(this.state.activeChat.length > 14){
                this.setState({offsetTop:true});
            }
            this.setState({endIndexMessagesLoaded:this.state.endIndexMessagesLoaded+1});
        }
        
    }

    handleSearch(value) {
        this.props.searchUsers(value);
    };

    logoutWithToken(){
        localStorage.clear();
        logout();
        this.props.setAuth(false);
    };
    
    render() {

        if(!this.props.isAuth)
            return <Redirect to="/login"/>

        return<><div id="123"></div>  <Profile {...this.props}
        setEndActual={this.setEndActual.bind(this)}
        setStartActual={this.setStartActual.bind(this)}
        startIndexMessagesLoaded={this.state.startIndexMessagesLoaded}
        endIndexMessagesLoaded={this.state.endIndexMessagesLoaded}
            setActiveChat={this.setActiveChat.bind(this)}
            activeChat={this.state.activeChat}
            setScroll={this.setScroll.bind(this)}
            scrollAfterAddMessage={this.state.scrollAfterAddMessage}
            addFriend={this.props.addFriend} sendMessage={this.sendMessage.bind(this)}
            logout={this.logoutWithToken.bind(this)} handleSearch={this.handleSearch.bind(this)} /></>
    }

};

const mapStateToProps = state => {

    return {
        user: getUserForSocket(state),
        list: state.messages.list,
        isAuth:state.auth.isAuth,
        chats: state.profilePage.chats,
        isFetching:state.profilePage.isFetching
    }
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {updateMessages, updateChats, logout,searchUsers, clearAll, setShowGroupCreate, setShowGroupSettings, addFriend, setAuth, setActiveChatId })
)(ProfileContainer);