import * as consts from "./../actions/appActions";
// import {initialState} from "./../initialState";
export const initialState = {
    initialized: false
};

export const appReducer = (state = initialState,action ) => {
    switch(action.type){
        case consts.SET_INITIALIZE:
            return {
                ...state,
                initialized: true,
            };
        default: return state;
    }
};
