import React, {useState,useCallback} from 'react';

import {FormUserDetails} from './FormUserDetails.jsx';
import {FormWithConnect} from './FormEmailPassword.jsx';
import {FormVerifyCode} from "./FormVerifyCode.jsx";

const Register = ({onSubmit, isVerified, verifyCode, sendEmailThunk, email}) => {
    const [step, setStep] = useState(1);
    const memoizedHandleClick = useCallback(
        (email,step,isVerified) => {
            if(email !== null || isVerified){
            setStep(step+1);
        }
    }, []);

    memoizedHandleClick(email,step,isVerified);
    
    switch (step) {
        case 1:
            return <FormWithConnect
                sendEmailThunk={sendEmailThunk}/>;
        case 2:
            return <FormVerifyCode
                isVerified={isVerified}
                verifyCode={verifyCode}/>;
        case 3:
            return <FormUserDetails
                onSubmit={onSubmit}/>;
        default:
            return <FormWithConnect
                sendEmailThunk={sendEmailThunk}/>;
    }
};

export default Register;
