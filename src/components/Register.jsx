import React, { useState} from 'react';
import FormUserDetails from './FormUserDetails.jsx';
import FormUserEmail from './FormEmailPassword.jsx';
import FormVerifyCode from "./FormVerifyCode.jsx";


const Register = ({signUp,verifyCodeUser}) =>{
  const [step,setStep] = useState(1);


  const handleSubmit = (values) => {
    signUp(values);
  };

    switch (step) {
      case 1:
        return <FormUserEmail
            nextStep={() => setStep(step + 1)}/>;
      case 2:
          return <FormVerifyCode
              nextStep={() => setStep(step + 1)}
              prevStep={() => setStep(step -1)}
              verifyCode={verifyCodeUser}/> ;
      case 3:
        return  <FormUserDetails
            prevStep={() => setStep(step -2)}
            handleSubmit={handleSubmit}
          />;
      default:setStep(1);
    }
};

export default Register;
