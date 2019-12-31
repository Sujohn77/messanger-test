import { stopSubmit } from "redux-form";
import store from "./../store"

import  UserAPI  from "./../../api/NotAuthorizied";
import  ProfileAPI  from "./../../api/Authorized";

import { setRegister, setTrialRegister, verify } from "../actionCreators/registerActionCreators";
import { updateChatMembers,updateFriendList, setSearchUsers, setProfileData, clearMessagesChat, setShowGroupSettings, setShowGroupCreate, addChat, toggleFetching } from "../actionCreators/profileActionCreators";
import { login } from "../actionCreators/loginActionCreators";
import { setAuth } from "../actionCreators/authActionCreators";

const initializer = (dispatch) => (profileData, loginData) => {
    dispatch(login(loginData));
    dispatch(setProfileData(profileData));
    dispatch(setAuth(true));
};

export const sendEmailThunk = ({ email, password }) => async (dispatch) => {
    const apiServices = new UserAPI();
    try {
        const response = await apiServices.sendCodeAndCheckEmail({ email, password });

        if (response.resultCode === 0) {
            dispatch(setTrialRegister({ email, password }))
        } else {
            stopSubmit("emailPassword", { _error: response.message });
        }
    } catch (e) {
        console.log(e.message);
    }
};
export const setUserData = ({ email, password, firstName, lastName }) => async (dispatch) => {
    const apiServices = new UserAPI();
    try {
        const response = await apiServices.setUserData({ email, password, firstName, lastName });

        if (response.resultCode === 0) {
            let token = response.data.token;
            localStorage.setItem("token", token);

            dispatch(setRegister({ firstName, lastName }));

            const initializeUser = initializer(dispatch);
            const id = response.data._id;
            const userInfo = response.data.user;

            initializeUser({ id,chats: [],friendList: [] }, userInfo);
        }
    } catch (e) {
        console.log(e.message);
    }
};
export const setLogin = ({ email, password }) => async (dispatch) => {
    const apiServices = new UserAPI();
    try {
        dispatch(toggleFetching(true));
        const response = await apiServices.login({ email, password });
        
        if (response.resultCode === 0) {
            let token = response.data.token;
            localStorage.setItem('token', token);

            const initializeUser = initializer(dispatch);
            const id = response.data._id;
            
            const chats = response.data.chats;
            const userInfo = response.data.user;
            const friendList = response.data.friendList;
            dispatch(toggleFetching(false));
            initializeUser({ id, chats, friendList }, userInfo);
        }
        else {
            stopSubmit("login", { _error: response.message });
        }
    } catch (e) {
        console.log(e.message);
    }
};

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

export const verifyCode = (code) => async (dispatch) => {
    const apiServices = new UserAPI();
    try {
        const response = await apiServices.verifyCode({ code });
        console.log(response);
        console.log(code);
        if (response.resultCode === 0) {
            dispatch(verify());
        } else {
            stopSubmit("verifyForm", { _error: "Wrong code" });
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

export const authThunk = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    const apiServices = new UserAPI();
    if (token !== null) {
        dispatch(toggleFetching(true));
        
        const response = await apiServices.getAuth(token);
                
        if (response.resultCode === 0) {
            const initializeUser = initializer(dispatch);
            const id = response.data._id;
            
            const chats = response.data.chats;
            const userInfo = response.data.user;
            const friendList = response.data.friendList;

            dispatch(toggleFetching(false));
            initializeUser({ id, chats, friendList }, userInfo);
        }
    }
};

export const saveChatPosition = (chatId, position) => async (dispatch) => {
    const apiServices = new ProfileAPI();

    await apiServices.saveChatPosition(chatId,position);
};
