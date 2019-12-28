import * as consts from "./../actions/messagesActions";

export const toggleIsLoadingMessages = (value) =>{
    return {type:consts.TOGGLE_NEXT_PAGE_LOADING ,payload:value}
}
export const toggleHasNewPage = (value) =>{
    return {type:consts.TOGGLE_HAS_NEXT_PAGE,payload:value}
}
export const updateMessages = (list) =>{
    return {type:consts.UPDATE_MESSAGES,payload:list}
}
export const moveIndexesList = (list) =>{
    return {type:consts.MOVE_INDEX_POSITIONS,payload:list}
}