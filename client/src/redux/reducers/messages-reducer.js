import * as consts from "./../actions/messagesActions";
// import {initialState} from "./../initialState";
const initialState = {
  hasNextPage:true,
  isNextPageLoading:false,
  list:[],
  size:14
}

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case consts.TOGGLE_HAS_NEXT_PAGE:
        return {
          ...state, 
          hasNextPage: action.payload
      };
      case consts.TOGGLE_NEXT_PAGE_LOADING:
        return {
          ...state,
          isNextPageLoading: action.payload
        };
      case consts.UPDATE_MESSAGES:
        return {
          ...state,
          list: action.payload
        };
      case consts.MOVE_INDEX_POSITIONS:
        return {
          ...state,
          startIndex: state.endIndex,
          endIndex:state.endIndex + action.payload
        };
      default:
        return state;
    }
  } 