import * as consts from "../actions/registerActions";

export const initialState = {
    email:null,
    password:null,
    firstName:null,
    lastName: null
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case consts.SIGN_UP_TRIAL:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password
            };
        case consts.SIGN_UP:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
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