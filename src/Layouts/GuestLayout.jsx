import React from 'react';

import SignIn from "../components/Login.jsx";

const BlueBack = {
    background:"#5682a3",
    height:"300px"
};
const GreyBack = {
    background:"#e7ebf0",
    height:"calc(100% - 300px)"
};

export const GuestLayout = props => {
    return <>
        <div style={BlueBack}/>

        { (props.children) ? props.children: <SignIn/>}

        <div style={GreyBack}/>
    </>
};