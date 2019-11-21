import React from 'react';
import FormUserDetails from "../components/FormUserDetails.jsx";
import {connect} from 'react-redux';
import {setUserAPI} from "../redux/user-reducer";

const FormDetailsContainer = (props) => {
    const signUp = (data) => {
        props.setUserAPI(data)
    };
    return <FormUserDetails {...props} signUp={signUp}/>
};

export default connect(null,{setUserAPI})(FormDetailsContainer)