import React from 'react';
import {SignIn} from "../components/Login.jsx";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {UserAPI} from "../api/register";
import * as axios from "axios";
import {stopSubmit} from "redux-form";

const LoginContainer = (props) => {
    const signIn = (values) => {
        // if (values.length > 0) {
        //     props.setUserThunk(values)
        // }
    };
    if (props.isAuth) return <Redirect to="/profile"/>
    return "";
    // return <SignIn {...props} verifyCodeUser={verifyCodeUser} checkEmailAndSendCode={checkEmailAndSendCode}
    //                signIn={signIn} />
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth
    }
};

export default connect(mapStateToProps)(LoginContainer)