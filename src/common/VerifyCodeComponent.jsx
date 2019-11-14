import React from 'react';
import Register from "../components/Register.jsx";
import { connect } from 'react-redux';
import { setUserThunk } from "../redux/user-reducer";
import {Redirect} from 'react-router-dom';
import * as axios from "axios";

const VerifyCodeComponent = (props) => (Component) => {

    const verifyCodeUser = async (code) =>{
        let res = await fetch("http://localhost:3001/register/"+code,{method:"POST"});
        return res.statusText;
    };

    return <Component {...props} verifyCodeUser={verifyCodeUser}/>
};



export default VerifyCodeComponent;