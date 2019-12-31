import { stopSubmit } from "redux-form";

import  UserAPI  from "./../../api/NotAuthorizied";

import { setProfileData, toggleFetching } from "../actionCreators/profileActionCreators";
import { login } from "../actionCreators/loginActionCreators";
import { setAuth } from "../actionCreators/authActionCreators";

const initializer = (dispatch) => (profileData, loginData) => {
    dispatch(login(loginData));
    dispatch(setProfileData(profileData));
    dispatch(setAuth(true));
};

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

