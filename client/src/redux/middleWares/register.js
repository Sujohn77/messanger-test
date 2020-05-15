import { stopSubmit } from "redux-form";

import  UserAPI  from "./../../api/NotAuthorizied";

import { setRegister, setTrialRegister, verify } from "../actionCreators/registerActionCreators";
import { setProfileData} from "../actionCreators/profileActionCreators";
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

