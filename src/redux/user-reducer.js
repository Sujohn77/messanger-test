import {UserAPI} from "../api/register";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    data:{
        email:null,
        firstName:null,
        lastName: null
    }
};

export const appReducer = (state = initialState,action ) => {
    switch(action.type){
        case SET_USER_DATA:
            return {
                ...state,
                data: action.payload,
            };
        default: return state;
    }

};

const setUser = (email,firstName,lastName) =>({type: SET_USER_DATA,payload:{email,firstName,lastName}});

export const setUserAPI = (data) => async (dispatch) => {
    debugger
    let response = await UserAPI.setUserData(data);

    if(response.ok){
        dispatch(setUser(data));
    } else{
        dispatch(stopSubmit("detail-form",{_error:"This email was already registered"}));
    }
};