import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import FormEmailPasswordLogin from './FormEmailPasswordLogin.jsx';
import FormVerifyCode from "./FormVerifyCode.jsx";
import {stopSubmit} from "redux-form";

const SignIn = ({signIn,verifyCodeUser,checkEmailAndSendCode}) => {
    const [step,setStep] = useState(1);

    const onSubmit = async (values) => {
        debugger
        let response = await checkEmailAndSendCode(values);
        debugger
        if(response){
            setStep(step+1);
        }
        else{
            stopSubmit("emailPasswordLogin",{_error:response.data.message}) // WRONG CODE
        }

    };

    switch (step) {
        case 1:
            return <FormEmailPasswordLogin
                onSubmit={onSubmit}/>;
        case 2:
            return <FormVerifyCode
                signIn={signIn}
                nextStep={() => setStep(step + 1)}
                prevStep={() => setStep(step - 1)}
                verifyCode={verifyCodeUser}/>;
        default:setStep(1);
    }
};
export default SignIn;

