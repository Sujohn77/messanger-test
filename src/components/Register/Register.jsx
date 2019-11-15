import React, {useState} from 'react';

import {FormUserDetails} from './FormUserDetails.jsx';
import {FormWithConnect} from './FormEmailPassword.jsx';
import {FormVerifyCode} from "./FormVerifyCode.jsx";

const Register = ({onSubmit,accessCode, sendEmailThunk, code}) => {
    const [step, setStep] = useState(1);
    debugger
    if(accessCode){
        return <FormVerifyCode
            code={code}
            nextStep={() => setStep(step + 1)}
            prevStep={() => setStep(step - 1)}/>;
    }
    switch (step) {
        case 1:
            return <FormWithConnect
                sendEmailThunk={sendEmailThunk}/>;
        case 2:
            return <FormUserDetails
                prevStep={() => setStep(step - 2)}
                onSubmit={onSubmit}
            />;
        default:
            setStep(1);
    }
};

export default Register;
