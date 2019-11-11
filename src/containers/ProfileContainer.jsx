import React from 'react';

const BlueBack = {
    background:"#5682a3",
    height:"300px"
};
const GreyBack= {
    background:"#e7ebf0",
    height:"calc(100% - 300px)"
};

export const ProfileContainer = (props) => {
    return <>
        <div style={BlueBack}/>
    </>
};