import React from 'react';

export const withFetchData = (Component) => (props) => {
    const sendEmailMessage = async (values) => {
        debugger
        try{
            if(!values.email){
                values.email = "stonebo0sh56@gmail.com"
            }
            let [email,password] = [values.email,values.password];
            let response = await fetch("http://localhost:3001/login/",{method:'POST',body: JSON.stringify({email,password})});

            if(!response.ok){
                console.log("Error HTTP: "+ response.status);
            }
        }
        catch (e) {
            console.log("Error : "+ e.message);
        }
    };

    return <>
        <Component {...props} sendEmailMessage={sendEmailMessage}/>
    </>
};