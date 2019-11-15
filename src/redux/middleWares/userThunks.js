import {UserAPI} from "../../api/register";
import {login, setRegister, setTrialRegister, setAccessCode} from "../actionCreators/userActionCreators";
import {stopSubmit} from "redux-form";

export const sendEmailThunk = ({email, password}) => async (dispatch) => {
    try {
        UserAPI.sendCodeAndCheckEmail({email, password}).then((response)=> {
            if (response.resultCode === 0) {

                dispatch(setAccessCode());
                dispatch(setTrialRegister({email, password, code: response.data.code}))

            } else {

                stopSubmit("emailPassword",{_error: response.data.message});
            }
        });
    } catch (e) {
        debugger
        console.log(e.message);
    }
};
export const setUserData = ({firstName,lastName}) => async (dispatch) => {
    try {
        const response = await new UserAPI.setUserData({firstName,lastName});
        if (response.resultCode === 0) {
            let token = response.data.token;
            localStorage.setItem('token', token);
            dispatch(setRegister({firstName,lastName}));
        }
    } catch (e) {
        console.log(e.message);
    }
};

export const authThunk = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    const response = await  UserAPI.getAuth(token);

    if (response.resultCode === 0) {
        dispatch(login(response.data));
    }
};