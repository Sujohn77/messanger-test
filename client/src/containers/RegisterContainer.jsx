// LIBRARIES
import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
// COMPONENTS
import Register from "./../components/Register/Register.jsx";
// MIDDLEWARES
import {sendEmailThunk, setUserData, verifyCode} from "./../redux/middleWares/register";

const RegisterContainer = ({setUserData, email, password, ...props}) => {
    const onSubmit = ({firstName, lastName}) => {
        setUserData({email, password, firstName, lastName});
    };
    
    if (props.isAuth) return <Redirect to="/profile"/>;

    return <Register {...props} email={email} password={password} onSubmit={onSubmit} />
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        email: state.userData.user.email,
        password: state.userData.user.password,
        isVerified: state.userData.isVerified
    }
};

export default connect(mapStateToProps, {sendEmailThunk, setUserData, verifyCode})(RegisterContainer)