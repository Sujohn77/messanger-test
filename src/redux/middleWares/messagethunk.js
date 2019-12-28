import {  ProfileAPI } from "../../api/user";

import { toggleHasNewPage, toggleIsLoadingMessages, updateMessages,moveIndexesList } from "../actionCreators/messageActionCreators";


export const loadNextPortion = (activeChatId,startIndex,endIndex) => async(dispatch) => {
    dispatch(toggleIsLoadingMessages(true));
    
    const response = await ProfileAPI.getPortionMessages(activeChatId,startIndex,endIndex);
    
    if(response.resultCode === 0){
        dispatch(toggleIsLoadingMessages(false));
        dispatch(moveIndexesList(14));
        dispatch(toggleHasNewPage(response.data.hasNewPage))
        dispatch(updateMessages(response.data.messages));
    }
}