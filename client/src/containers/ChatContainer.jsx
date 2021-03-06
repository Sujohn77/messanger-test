// LIBRARIES
import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
// COMPONENTS
import {Chat} from "./../components/Profile/Chat/Chat.jsx";
// ACTION CREATORS
import {updateChats} from "./../redux/actionCreators/profileActionCreators";
// MIDDLEWARES
import {loadNextPortion,saveChatPosition} from "./../redux/middleWares/profile";
// SELECTORS
import {getUserForSocket} from "./../redux/selectors/profile-selectors";

const Container = ({sendMessage,setShowGroupSettings,activeChat,loadNextPortion,activeChatId,chats,updateChats,saveChatPosition,...props}) => {
    const [message, setMessage] = useState("")
    const [startIndex,setStartIndex] = useState(null);
    const [endIndex,setEndIndex] = useState(null);

    useEffect(() => {
        const callback = sendMessageFunc(message);
        window.addEventListener('keydown', callback);
        return () => {
            window.removeEventListener('keydown', callback);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);
    

    useEffect(() => {
        if(activeChatId != null){
            if(activeChat.length > 14 && activeChat.position > 20){
                setStartIndex(Math.ceil(activeChat.position / 62));
                setEndIndex(Math.ceil(activeChat.position / 62 + 17));
                loadNextPortion(activeChatId, Math.ceil(activeChat.position / 62),Math.ceil(activeChat.position / 62 + 17))
                props.setStartActual(Math.ceil(activeChat.position / 62));
                props.setEndActual(Math.ceil(activeChat.position / 62 + 17));
            }
            else{
                loadNextPortion(activeChatId,0,17)
                setStartIndex(0);
                setEndIndex(17);
                props.setStartActual(0);
                props.setEndActual(17);
            }
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChatId]);

    useEffect(() => {
        if(props.list.length < 14 && props.list){
            setEndIndex(props.list.length);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.list]);

    const savePositionChat = (scrollTop) =>{
        const newChats = chats.map((chat) => {
            if(chat._id === activeChatId){
                chat.scrollTop = scrollTop;
            }
            return chat
        })
        saveChatPosition(activeChatId,scrollTop);
        updateChats(newChats);
    }
    const sendMessageFunc = (message)=> (e) =>{
        if(e.keyCode === 13 ){
            sendMessage(message);
            setMessage("");
        }
    }

    const openGroup = () => {
        if (activeChat.type === "group") {
            setShowGroupSettings(true)
        }
    }
    
    return <Chat {...props}
                activeChat={activeChat}
                startIndex={startIndex}
                endIndex={endIndex}
                setEndIndex={setEndIndex}
                setStartIndex={setStartIndex}
                sendMessageFunc={sendMessageFunc}
                sendMessage={sendMessage}
                activeChatId={activeChatId}
                messagesLength={activeChat.length}
                scrollTopChat={activeChat.position}
                savePositionChat={savePositionChat}
                loadNextPage={loadNextPortion}
                openGroup={openGroup}
                message={message}
                setMessage={setMessage}/>
};

const mapStateToProps = (state) => {
    return {
        user: getUserForSocket(state),
        activeChatId:state.profilePage.activeChatId,
        chats: state.profilePage.chats,
        hasNextPage:state.messages.hasNextPage,
        isNextPageLoading:state.messages.isNextPageLoading
    }
}

export const ChatContainer = connect(mapStateToProps,{loadNextPortion,updateChats,saveChatPosition})(Container);