import * as consts from "./../actions/registerActions";

export const setTrialRegister = ({email, password}) => ({
    type: consts.SIGN_UP_TRIAL,
    payload: {email, password}
});
export const setRegister= (firstName, lastName) => ({
    type: consts.SIGN_UP,
    payload: {firstName, lastName}
});
export const verify = () => ({
    type: consts.VERIFY_CODE
});

