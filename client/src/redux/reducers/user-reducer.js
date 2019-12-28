import * as consts from "./../actions/userActions";
// import {initialState} from "./../initialState";

export const initialState = {
    user:{
        email:null,
        password:null,
        firstName:null,
        lastName: null
    },
    isVerified:false,
    accessCode: true
};


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case consts.SIGN_UP_TRIAL:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload.email,
                    password: action.payload.password
                },
                accessCode: true
            };
        case consts.SIGN_UP:
            return {
                ...state,
                isAuth: true,
                user: {
                    ...state.user,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                }
            };
        case consts.LOG_IN:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            };
        case consts.LOG_OUT:
            return {
                ...state,
                isAuth: false,
                user: {
                    ...state.user,
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