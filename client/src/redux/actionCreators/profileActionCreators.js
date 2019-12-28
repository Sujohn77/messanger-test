import * as consts from "./../actions/profileActions";

export const setSearchUsers = (users) => ({
    type: consts.GET_SEARCH_USERS,
    payload: users
});

export const updateChats = (chats) => ({
    type: consts.UPDATE_CHATS,
    payload: chats
});

export const addChat = (chat) => ({
    type: consts.ADD_CHAT,
    payload: chat
});


export const updateFriendList = (friendList) => ({
    type: consts.ADD_FRIEND,
    payload: friendList
});

export const setProfileData = (data) => ({
    type: consts.SET_PROFILE_DATA,
    payload: data
});

export const clearMessagesChat = (chatId) => ({
    type: consts.DELETE_MESSAGES_CHAT,
    payload: chatId
});

export const setActiveChatId = (chatId) => ({
    type: consts.SET_ACTIVE_CHATID,
    payload: chatId
});

export const setShowGroupSettings = (isShow) => ({
    type: consts.SET_SHOW_SETTINGS_GROUP,
    payload: isShow
});

export const setShowGroupCreate = (isShow) => ({
    type: consts.SET_SHOW_ADD_GROUP,
    payload: isShow
});

export const updateChatMembers = ({chatName, members}) => ({
    type: consts.SET_SHOW_ADD_GROUP,
    payload: {chatName, members}
});

export const toggleFetching = (value) => ({
    type: consts.TOGGLE_FETCHING,
    payload: value
});
