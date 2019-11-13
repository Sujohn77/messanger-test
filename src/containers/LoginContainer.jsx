import React from 'react';
import Login from "../components/Login.jsx";
import {connect} from 'react-redux';
import {loginThunk} from "../redux/user-reducer";
import * as axios from "axios";
const RegisterContainer = (props) => {
    const signIn = (values) => {
        props.loginThunk(values)
    };

    const verifyCodeUser = async (code) =>{
        let res = await fetch("http://localhost:3001/register/"+code,{method:"POST"});
        return res.statusText;
    };

    return <Login {...props} verifyCodeUser={verifyCodeUser} signIn={signIn}/>
};

export default connect(null,{loginThunk})(RegisterContainer)