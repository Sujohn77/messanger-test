export const initialState = {
    user: {
        email:null,
        password:null,
        firstName:null,
        lastName: null
    },
    isVerified:false,
    searchUsers: [],
    chats: [],
    id: null,
    showSettingsGroup:false,
    showCreateGroup: false,
    isFetching:null,
    activeChatId:null,
    isAuth:false,
    hasNextPage:true,
    isNextPageLoading:false,
    list:[],
    startIndex:0,
    endIndex:17
};