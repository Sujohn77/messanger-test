import React from "react";
import Register from "./../components/Register/Register.jsx";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
import {sendEmailThunk, setUserData, verifyCode} from "./../redux/middleWares/userThunks";

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