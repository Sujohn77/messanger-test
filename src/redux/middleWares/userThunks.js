import {UserAPI} from "../../api/user";
import {login, setRegister, setTrialRegister, verify} from "../actionCreators/userActionCreators";
import {stopSubmit} from "redux-form";
import store from "../store"

const state = store.getState();

export const sendEmailThunk = ({email, password}) => async (dispatch) => {
    try {
        const response = await UserAPI.sendCodeAndCheckEmail({email, password});

        if (response.resultCode === 0) {
            dispatch(setTrialRegister({email, password}))
        } else {
            stopSubmit("emailPassword", {_error: response.message});
        }
    } catch (e) {
        console.log(e.message);
    }
};
export const setUserData = ({email, password, firstName, lastName}) => async (dispatch) => {
    try {

        const response = await UserAPI.setUserData({email, password, firstName, lastName});

        if (response.resultCode === 0) {
            let token = response.data.token;
            localStorage.setItem("token", token);
            dispatch(setRegister({firstName, lastName}));
        }
    } catch (e) {
        console.log(e.message);
    }
};
export const setLogin = ({email, password}) => async (dispatch) => {
    try {
        const response = await UserAPI.login({email, password});

        if (response.resultCode === 0) {
            let token = response.data.token;
            localStorage.setItem('token', token);
            dispatch(login(response.data));
        }
        else{
            stopSubmit("login", {_error: response.message});
        }
    } catch (e) {
        console.log(e.message);
    }
};

export const verifyCode = (code) => async (dispatch) => {
    try {

        const response = await UserAPI.verifyCode({code});
        if (response.resultCode === 0) {
            dispatch(verify());
        } else {
            stopSubmit("verifyForm", {_error: "Wrong code"});
        }
    } catch (e) {
        console.log(e.message);
    }
};

export const addUser = (friendEmail,name) =>  async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const userId = state.user.data._id;

        const response = await UserAPI.addUser({friendEmail,userId,name},token);
        const newToken = response.data.token;

        localStorage.setItem('token', newToken);
        dispatch(login(response.data.user.user));
    } catch (e) {
        console.log(e.message);
    }
};

export const authThunk = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    const response = await UserAPI.getAuth(token);

    if (response.resultCode === 0) {
        const id = response.data.user.iat;
        const data = response.data.user.user;

        dispatch(login({...data,id}));
    }
};