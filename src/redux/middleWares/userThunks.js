import { stopSubmit } from "redux-form";
import store from "./../store"

import { UserAPI, ProfileAPI } from "../../api/user";

import { setRegister, setTrialRegister, verify } from "../actionCreators/registerActionCreators";
import { addNewFriend, setSearchUsers, setProfileData } from "../actionCreators/profileActionCreators";
import { login } from "../actionCreators/loginActionCreators";
import { setAuth } from "../actionCreators/authActionCreators";



const initializer = (dispatch) => (profileData, loginData) => {
    dispatch(login(loginData));
    dispatch(setProfileData(profileData));
    dispatch(setAuth(true));
};

export const sendEmailThunk = ({ email, password }) => async (dispatch) => {
    try {
        const response = await UserAPI.sendCodeAndCheckEmail({ email, password });

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
    try {
        const response = await UserAPI.setUserData({ email, password, firstName, lastName });

        if (response.resultCode === 0) {
            let token = response.data.token;
            localStorage.setItem("token", token);
            dispatch(setRegister({ firstName, lastName }));
        }
    } catch (e) {
        console.log(e.message);
    }
};
export const setLogin = ({ email, password }) => async (dispatch) => {
    try {
        const response = await UserAPI.login({ email, password });

        if (response.resultCode === 0) {
            let token = response.data.token;
            localStorage.setItem('token', token);

            const initializeUser = initializer(dispatch);
            const id = response.data._id;

            const dialogs = response.data.dialogs;
            const userInfo = response.data.user;

            initializeUser({ id, dialogs }, userInfo);
        }
        else {
            stopSubmit("login", { _error: response.message });
        }
    } catch (e) {
        console.log(e.message);
    }
};

export const verifyCode = (code) => async (dispatch) => {
    try {
        const response = await UserAPI.verifyCode({ code });

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
    try {
        let state = store.getState();
        debugger
        const response = await ProfileAPI.addFriend(friendEmail, state.profilePage.id);
        debugger
        if (response.resultCode === 0) {
            dispatch(addNewFriend(response.data.dialogNewFriend));
        }
    } catch (e) {
        console.log(e.message);
    }
};

export const searchUsers = (firstName, lastName = "") => async (dispatch) => {
    try {
        if (firstName === "") {
            dispatch(setSearchUsers([]));
        }
        else {
            const response = await ProfileAPI.getUsers(firstName, lastName);

            if (response.resultCode === 0) {
                dispatch(setSearchUsers(response.data.users));
            }
        }

    } catch (e) {
        console.log(e.message);
    }
};

export const authThunk = () => async (dispatch) => {
    const token = localStorage.getItem('token');

    if (token !== null) {
        const response = await UserAPI.getAuth(token);

        if (response.resultCode === 0) {
            const initializeUser = initializer(dispatch);
            const id = response.data._id;

            const dialogs = response.data.dialogs;
            const userInfo = response.data.user;

            initializeUser({ id, dialogs }, userInfo);
        }
    }
};