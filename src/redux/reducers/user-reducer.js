import * as consts from "./../actions/userActions";
import {initialState} from "./../initialState";

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case consts.SIGN_UP_TRIAL:
            return {
                ...state,
                data: {
                    ...state.data,
                    email: action.payload.email,
                    password: action.payload.password
                },
                accessCode: true
            };
        case consts.SIGN_UP:
            return {
                ...state,
                isAuth: true,
                data: {
                    ...state.data,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                }
            };
        case consts.LOG_IN:
            debugger
            return {
                ...state,
                data: action.payload,
                isAuth: true
            };
        case consts.LOG_OUT:
            return {
                ...state,
                isAuth: false,
                data: {
                    ...state.data,
                    email: null,
                    password: null
                }
            };
        case consts.VERIFY_CODE:
            return {
                ...state,
                isVerified: true,
            };
        default:
            return state;
    }
};