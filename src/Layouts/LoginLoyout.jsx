import React from 'react';

import {RegisterContainer} from "../containers/RegisterContainer.jsx";

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
            <RegisterContainer/>
        <div style={GreyBack}/>
    </>
};