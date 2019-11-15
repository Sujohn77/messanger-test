import * as consts from "./../actions/userActions";

export const setTrialRegister = (email, password, code ) => ({
    type: consts.SIGN_UP_TRIAL,
    payload: {email, password, code}
});
export const setRegister= (firstName, lastName) => ({
    type: consts.SIGN_UP,
    payload: {firstName, lastName}
});
export const login = (data) => ({
    type: consts.SIGN_UP,
    payload: data
});
export const setAccessCode = () => ({
    type: consts.SET_ACCESS_CODE
});

export const logout = () => ({type: consts.LOG_OUT});
