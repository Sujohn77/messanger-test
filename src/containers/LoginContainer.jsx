import React from "react";
import {SignIn} from "../components/Login.jsx";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {setLogin} from "./../redux/middleWares/userThunks"

const LoginContainer = (props) => {
    const onSubmit = (values) => {
        props.setLogin(values);
    };

    if (props.isAuth) return <Redirect to="/profile"/>

    return <SignIn {...props} onSubmit={onSubmit} />
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps,{setLogin})(LoginContainer)