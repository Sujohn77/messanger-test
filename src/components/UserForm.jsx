import React, { useState} from 'react';
import FormUserDetails from './FormUserDetails.jsx';
import FormUserEmail from './FormUserEmail.jsx';
// import Success from './Success';

const UserForm = () =>{
  const [firstName,setFirstName] = useState(null);
  const [lastName,setLastName] = useState(null);

  const [step,setStep] = useState(1);

    switch (step) {
      case 1:

        return (
          <FormUserEmail
            nextStep={() => setStep(step + 1)}/>);
      case 2:

        return (
          <FormUserDetails
            nextStep={() => setStep(step + 1)}
            prevStep={() => setStep(step -1)}
            setFirstName={setFirstName}
            setLastName={setLastName}
            firstName={firstName}
            lastName={lastName}
          />
        );
      default:setStep(1);
      // case 4:
      //   return <Success />;
    }
};

export default UserForm;
