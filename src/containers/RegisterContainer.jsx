import React from 'react';
import Register from "../components/Register.jsx";
import {connect} from 'react-redux';
import {setUserThunk} from "../redux/user-reducer";
import {Redirect} from 'react-router-dom';

const RegisterContainer = (props) => {
    const verifyCodeUser = async (code) => {
        let res = await fetch("http://localhost:3001/register/" + code, {method: "POST"});
        return res.statusText;
    };

    if (props.isAuth) return <Redirect to="/profile"/>

    return <Register {...props} verifyCodeUser={verifyCodeUser}/>
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth
    }
};

export default connect(mapStateToProps, {setUserThunk})(RegisterContainer)