import React from 'react';
import {SignIn} from "../components/Register.jsx";

export const RegisterContainer = (props) => {
    const sendEmailMessage = async (values) => {
        debugger
        try{
            if(!values.email){
                values.email = "stonebo0sh56@gmail.com"
            }

            let response = await fetch("http://localhost:3001/login/"+values.email,{method:'POST'});

            if(!response.ok){
                console.log("Error HTTP: "+ response.status);
            }
        }
        catch (e) {
            console.log("Error : "+ e.message);
        }
    };

    return <>
        <SignIn {...props} sendEmailMessage={sendEmailMessage}/>
    </>
};