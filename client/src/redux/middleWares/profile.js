import { stopSubmit } from "redux-form";
import store from "./../store"
import  ProfileAPI  from "./../../api/Authorized";

import {toggleIsLoadingMessages,moveIndexesList,updateMessages,toggleHasNewPage} from "./../actionCreators/messageActionCreators";
import { updateChatMembers,updateFriendList, setSearchUsers, clearMessagesChat, setShowGroupSettings, setShowGroupCreate, addChat } from "../actionCreators/profileActionCreators";

export const clearAll = (chatId) => async (dispatch) => {
    const apiServices = new ProfileAPI();
    try {
        const response = await apiServices.clearChat(chatId);
        
        if (response.resultCode === 0) {
            dispatch(clearMessagesChat(chatId));
        }
    } catch (e) {
        console.log(e.message);
    }
};

export const addFriend = (friendEmail) => async (dispatch) => {
    const apiServices = new ProfileAPI();
    try {
        let state = store.getState();
        
        const response = await apiServices.addFriend(friendEmail, state.profilePage.id);
        debugger
        if (response.resultCode === 0) {
            dispatch(addChat(response.data.dialogNewFriend));
            dispatch(updateFriendList(response.data.friendList));
        }
    } catch (e) {
        console.log(e.message);
    }
};

export const searchUsers = (firstName, lastName = "") => async (dispatch) => {
    const apiServices = new ProfileAPI();
    try {
        if (firstName === "") {
            dispatch(setSearchUsers([]));
        }
        else {
            const response = await apiServices.getUsers(firstName, lastName);
            
            if (response.resultCode === 0) {
                dispatch(setSearchUsers(response.data.users));
            }
        }

    } catch (e) {
        console.log(e.message);
    }
};

export const addMembers = (chatId,users) => async(dispatch) => {
    const token = localStorage.getItem('token'); 
    const userEmails = users.map((user) => user.email);
    const apiServices = new ProfileAPI();
    if (token !== null) {
        const response = await apiServices.addMembers(userEmails,chatId,token);
        if(response.resultCode === 0){
            const userNames = users.map((user) => user.fullName);
            dispatch(updateChatMembers(userNames))
            dispatch(setShowGroupSettings(false))
        }
        else{
            stopSubmit("createGroup",{_error:response.message});
        }
    }
    
}

export const createGroup = (chatName) => async(dispatch) => {
    const token = localStorage.getItem('token'); 
    const apiServices = new ProfileAPI();
    if (token !== null) {
        const response = await apiServices.createChat(chatName,token);
        
        if(response.resultCode === 0){
            dispatch(addChat(response.data.chat))
            dispatch(setShowGroupSettings(true))
            dispatch(setShowGroupCreate(false))
        }
    }
    
}

export const saveChatPosition = (chatId, position) => async (dispatch) => {
    const apiServices = new ProfileAPI();

    await apiServices.saveChatPosition(chatId,position);
};

export const loadNextPortion = (activeChatId,startIndex,endIndex) => async(dispatch) => {
    const apiServices = new ProfileAPI();
    dispatch(toggleIsLoadingMessages(true));
    
    const response = await apiServices.getPortionMessages(activeChatId,startIndex,endIndex);
    
    if(response.resultCode === 0){
        dispatch(toggleIsLoadingMessages(false));
        dispatch(moveIndexesList(14));
        dispatch(toggleHasNewPage(response.data.hasNewPage))
        dispatch(updateMessages(response.data.messages));
    }
}