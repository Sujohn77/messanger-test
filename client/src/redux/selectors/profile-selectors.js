import {createSelector} from "reselect";

const getSearchUsers = (state) => {
    return state.profilePage.searchUsers
}

const getProfileId = (state) => {
    return state.profilePage.id
}

const getDialogs = (state) => {
    return state.profilePage.chats
}

export const getFilteredSearchUsers = createSelector([getSearchUsers,getProfileId],
     (searchUsers,id) => { 
         return searchUsers.filter((item) => item._id !== id && item)
    } 
);

const getProfileName = (state) => {
    if(state.userData.user.lastName){
        return state.userData.user.firstName + " " + state.userData.user.lastName;
    }
    else{
        return state.userData.user.firstName;
    }
}

export const getUserForSocket = createSelector([getProfileId,getProfileName],
    (id,name) => { 
        return {id, name};
   } 
);


export const getChatNamesUser = createSelector([getDialogs],
    (dialogs) => {
        
        const chatNames = dialogs.map((chat) => chat.name);
        return chatNames;
    }
);