import * as consts from "./../actions/profileActions";

export const setSearchUsers = (users) => ({
    type: consts.GET_SEARCH_USERS,
    payload: users
});

export const addNewFriend = (name) => ({
    type: consts.ADD_FRIEND,
    payload: name
});

export const setProfileData = (data) => ({
    type: consts.SET_PROFILE_DATA,
    payload: data
});

export const clearMessagesChat = (chatId) => ({
    type: consts.DELETE_MESSAGES_CHAT,
    payload: chatId
});


