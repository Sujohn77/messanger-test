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

export const getLastMessage = createSelector([getDialogs],
    (dialogs) => { 
        return dialogs && dialogs[dialogs.length - 1];
    }
);

export const getFilteredSearchUsers = createSelector([getSearchUsers,getProfileId],
     (searchUsers,id) => { 
         return searchUsers.filter((item) => item._id !== id && item)
    } 
);

const getProfileName = (state) => {
    return state.loginPage.user.firstName + " " + state.loginPage.user.lastName;
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