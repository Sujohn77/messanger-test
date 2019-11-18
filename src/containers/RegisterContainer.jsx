import React from "react";
import Register from "./../components/Register/Register.jsx";
import {connect} from "react-redux";
import {sendEmailThunk, setUserData, verifyCode} from "./../redux/middleWares/userThunks";
import {Redirect} from "react-router-dom";

const RegisterContainer = ({setUserData, email, password, ...props}) => {
    const onSubmit = ({firstName, lastName}) => {
        setUserData({email, password, firstName, lastName});
    };

    if (props.isAuth) return <Redirect to="/profile"/>

    return <Register {...props} onSubmit={onSubmit}/>
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth,
        accessCode: state.user.accessCode,
        email: state.user.data.email,
        password: state.user.data.password,
        isVerified: state.user.isVerified
    }
};

export default connect(mapStateToProps, {sendEmailThunk, setUserData, verifyCode})(RegisterContainer)