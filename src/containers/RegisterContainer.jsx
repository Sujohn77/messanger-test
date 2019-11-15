import React from "react";
import Register from "./../components/Register/Register.jsx";
import {connect} from "react-redux";
import {sendEmailThunk, setUserData} from "./../redux/middleWares/userThunks";
import {Redirect} from "react-router-dom";

const RegisterContainer = (props) => {
    const onSubmit = (values) => {
        setUserData(values);
    };

    if (props.isAuth) return <Redirect to="/profile"/>

    return <Register {...props} sendEmailThunk={sendEmailThunk} onSubmit={onSubmit}/>
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth,
        code: state.user.data.code,
        accessCode: state.user.accessCode
    }
};

export default connect(mapStateToProps, {sendEmailThunk, setUserData})(RegisterContainer)