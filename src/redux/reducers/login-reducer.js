import * as consts from "./../actions/loginActions";

export const initialState = {
    data: {
        email:null,
        password:null,
        firstName:null,
        lastName: null
    }
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case consts.LOG_IN:
            return {
                ...state,
                user: action.payload,
            };
        case consts.LOG_OUT:
            return {
                ...state,
                data: null
            };

        default:
            return state;
    }
};