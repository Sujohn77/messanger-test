import * as consts from "./../actions/userActions";

export const setTrialRegister = ({email, password}) => ({
    type: consts.SIGN_UP_TRIAL,
    payload: {email, password}
});
export const setRegister= (firstName, lastName) => ({
    type: consts.SIGN_UP,
    payload: {firstName, lastName}
});
export const login = (data) => ({
    type: consts.LOG_IN,
    payload: data
});
export const verify = () => ({
    type: consts.VERIFY_CODE
});

export const logout = () => ({type: consts.LOG_OUT});
