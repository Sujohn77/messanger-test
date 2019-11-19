import * as consts from "./../actions/profileActions";

export const initialState = {
    searchUsers: null,
    dialogs: [],
    id: null


};

export const profileReducer = (state = initialState,action ) => {
    switch(action.type){
        case consts.GET_SEARCH_USERS: {
            return {
                ...state,
                searchUsers: action.payload
            }
        }
        case consts.ADD_FRIEND: {
            return {
                ...state,
                dialogs: state.dialogs.push(action.payload)
            }
        }
        case consts.SET_PROFILE_DATA: {

            const newObj = {
                ...state,
                id:action.payload.id,
                dialogs:action.payload.dialogs
            };
            return {
                ...state,
               id:action.payload.id,
                dialogs:[action.payload.dialogs]
            }
        }
        default: return state;
    }
};
