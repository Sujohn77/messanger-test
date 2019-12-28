import * as consts from "./../actions/profileActions";
// import {initialState} from "./../initialState";
export const initialState = {
    searchUsers: [],
    chats: [],
    id: null,
    showSettingsGroup:false,
    showCreateGroup: false,
    isFetching:null,
    activeChatId:null
};

export const profileReducer = (state = initialState,action ) => {
    switch(action.type){
        case consts.GET_SEARCH_USERS: {
            return {
                ...state,
                searchUsers: action.payload
            }
        }

        case consts.ADD_CHAT: {
            return {
                ...state,
                chats: [...state.chats,action.payload]
            }
        }

        case consts.TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.payload
            }
        }

        case consts.UPDATE_CHATS: {
            return {
                ...state,
                chats: action.payload
            }
        }

        case consts.ADD_FRIEND: {
            
            return {
                ...state,
                friendsList:[...state.friendsList,action.payload]
            }
        }

        case consts.SET_PROFILE_DATA: {
            
            return {
                ...state,
               id:action.payload.id,
               chats:action.payload.chats,
               friendsList: action.payload.friendList || []
            }
        }

        case consts.UPDATE_MEMBERS_GROUP: {
            return {
                ...state,
               chats:state.chats.map((chat) => {
                   if(chat.name === action.payload.chatName){
                       chat.members = [chat.members, action.payload.members];
                   }
                   return chat
               })
            }
        }

        case consts.SET_SHOW_SETTINGS_GROUP: {
            return {
                ...state,
                showSettingsGroup:action.payload,
            }
        }

        case consts.SET_SHOW_ADD_GROUP: {
            return {
                ...state,
                showCreateGroup:action.payload,
            }
        }

        case consts.DELETE_MESSAGES_CHAT: {
            return {
                ...state,
               chats:state.chats.map((ch) => {
                   if(ch._id === action.payload) {
                       ch.messages = []
                   }
                   return ch;
               })
            }
        }
        case consts.SET_ACTIVE_CHATID: {

            return {
                ...state,
               activeChatId:action.payload
            }
        }
        default: return state;
    }
};
