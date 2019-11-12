import React from 'react';
import {stopSubmit} from "redux-form";

export const checkExistEmail = (Component) => (props) => {
    const checkUserEmail = async (values) => {

        try{
            debugger
            if(!values.email){
                values.email = "stonebo0sh56@gmail.com"
            }
            if(!values.password){
                values.password = "1111";
            }
            let [email, password] = [values.email,values.password];
            let response = await fetch("http://localhost:3001/register/"+email+"&"+password,{method:'POST'});

            if(!response.ok){
                stopSubmit('email-form',{error:response.data.message})
                console.log("Error HTTP: "+ response.status);
                debugger
            }
            debugger
        }
        catch (e) {
            debugger
            console.log("Error : "+ e.message);
        }
    };

    return <>
        <Component {...props} checkUserEmail={checkUserEmail}/>
    </>
};