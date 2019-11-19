import * as consts from "./../actions/authActions";

export const setAuth = (value) => ({
    type: consts.SET_AUTH,
    payload: value
});
