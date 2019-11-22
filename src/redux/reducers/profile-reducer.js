import * as consts from "./../actions/profileActions";

export const initialState = {
    searchUsers: [],
    chats: [],
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
                chats: [...state.chats,action.payload]
            }
        }
        case consts.SET_PROFILE_DATA: {
            return {
                ...state,
               id:action.payload.id,
               chats:[action.payload.chats]
            }
        }
        default: return state;
    }
};