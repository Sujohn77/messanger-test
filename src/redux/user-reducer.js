import {UserAPI} from "../api/register";
import {stopSubmit} from "redux-form";

const LOG_IN = "SIGN_UP";
const LOG_OUT = "LOG_OUT";


let initialState = {
    data:{
        email:null,
        password:null,
        firstName:null,
        lastName: null
    },
    isAuth:false
};

export const userReducer = (state = initialState,action ) => {
    switch(action.type){
        case LOG_IN:
            return {
                ...state,
                data: action.payload,
                isAuth: true
            };
        case LOG_OUT:
            return {
                ...state,
                isAuth: false,
                data: {
                    ...state.data,
                    email:null,
                    password:null
                }
            };
        default: return state;
    }

};

const setUser = (email,password,firstName,lastName) =>({type: LOG_IN,payload:{email,password,firstName,lastName}});
export const logout = () => ({type: LOG_OUT});
export const setUserThunk = (data) => async (dispatch) => {
    try{
        const response = await UserAPI.setUserData(data);
        if(response.ok){
            let token = "Bearer "+response.token;
            localStorage.setItem('token',token);
            dispatch(setUser(response.user))
        }
    }
    catch (e) {
        console.log(e.message);
    }
};

export const authThunk = () => async (dispatch) => {

    const token = localStorage.getItem('token');
    const response = await UserAPI.getAuth(token);
    debugger
    if(response.isAuth){
        dispatch(setUser(response.data));
    }
};

