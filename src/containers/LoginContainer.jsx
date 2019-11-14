import React from 'react';
import SignIn from "../components/Login.jsx";
import {connect} from 'react-redux';
import {setUserThunk} from "../redux/user-reducer";
import {Redirect} from 'react-router-dom';
import {UserAPI} from "../api/register";
import * as axios from "axios";
import {stopSubmit} from "redux-form";

const LoginContainer = (props) => {
    const signIn = (values) => {
        debugger
        if(values.length > 0){
            props.setUserThunk(values)
        }
    };

    const verifyCodeUser = async (code) =>{
        const result = await UserAPI.verifyCode(code);
        return result.statusText;
    };

    const checkEmailAndSendCode = (values) => {
        debugger
        return new Promise((resolve,reject)=> {
            debugger
            stopSubmit("emailPasswordLogin");
            axios.post("http://localhost:3001/login/"+values.email+"&"+values.password).then(response=>{
                if (response.data.ok){
                    resolve(true);
                } else{
                   reject(false);
                }
            });
        })

    };
    if (props.isAuth) return <Redirect to="/profile" />

    return <SignIn {...props} verifyCodeUser={verifyCodeUser} checkEmailAndSendCode={checkEmailAndSendCode} signIn={signIn} setUserThunk={setUserThunk}/>
};

const mapStateToProps = (state) => {
    return {
        isAuth:state.user.isAuth
    }
};

export default connect(mapStateToProps,{setUserThunk})(LoginContainer)