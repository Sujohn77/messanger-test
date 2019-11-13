import {UserAPI} from "../api/register";
import {stopSubmit} from "redux-form";


const SIGN_UP = "SIGN_UP";
const LOG_OUT = "LOG_OUT";

let initialState = {
    data:{
        email:null,
        password:null,
        firstName:null,
        lastName: null
    },
    Auth:true
};

export const userReducer = (state = initialState,action ) => {
    switch(action.type){
        case SIGN_UP:
            return {
                ...state,
                data: action.payload,
                Auth: true
            };
        case LOG_OUT:
            return {
                ...state,
                Auth: false
            };
        default: return state;
    }

};

const setUser = (email,firstName,lastName) =>({type: SIGN_UP,payload:{email,firstName,lastName}});

export const setUserThunk = (data) => async (dispatch) => {

    try{
        debugger
        const response = UserAPI.setUserData(data);

        if(response.ok){
            dispatch(setUser(response.data))
        }
    }
    catch (e) {
        console.log(e.message);
    }
};
