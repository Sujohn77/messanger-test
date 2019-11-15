import {initialState} from "./../initialState";
import * as consts from "./../actions/appActions";

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
