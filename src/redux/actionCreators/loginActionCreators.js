import * as consts from "../actions/loginActions";

export const login = (data) => ({
    type: consts.LOG_IN,
    payload: data
});

export const logout = () => ({type: consts.LOG_OUT});
