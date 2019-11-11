import React from 'react';

import {SignIn} from "../components/Login.jsx";
import {LoginContainer} from "../containers/LoginContainer.jsx";

const BlueBack = {
    background:"#5682a3",
    height:"300px"
};
const GreyBack = {
    background:"#e7ebf0",
    height:"calc(100% - 300px)"
};

export const LoginLayout = props => {
    return <>
        <div style={BlueBack}/>
            <LoginContainer/>
        <div style={GreyBack}/>
    </>
};