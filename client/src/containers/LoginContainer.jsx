// LIBRARIES
import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
// COMPONENTS
import {SignIn} from "../components/Login.jsx";
// MIDDLEWARES
import {setLogin} from "./../redux/middleWares/login"

const LoginContainer = (props) => {
    const onSubmit = (values) => {
        props.setLogin(values);
    };

    if (props.isAuth) return <Redirect to="/profile"/>

    return <SignIn {...props} onSubmit={onSubmit} />
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isFetching:state.profilePage.isFetching
    }
};

export default connect(mapStateToProps,{setLogin})(LoginContainer)