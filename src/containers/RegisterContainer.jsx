import React from 'react';
import Register from "../components/Register.jsx";
import {connect} from 'react-redux';
import {setUserThunk} from "../redux/user-reducer";
import * as axios from "axios";
const RegisterContainer = (props) => {
    const signUp = (values) => {
        props.setUserThunk(values)
    };

    const verifyCodeUser = async (code) =>{
        let res = await fetch("http://localhost:3001/register/"+code,{method:"POST"});
        return res.statusText;
    };

    return <Register {...props} verifyCodeUser={verifyCodeUser} signUp={signUp}/>
};

export default connect(null,{setUserThunk})(RegisterContainer)