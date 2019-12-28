import React from "react";
import {connect} from 'react-redux';
import styled from "styled-components";
// MATERIAL UI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
// REDUX FORM
import {reduxForm,Field} from "redux-form";
import {required} from "../../validators/required";
import {maxLengthCreator} from "../../validators/maxLengthCreator";
import Link from "@material-ui/core/Link";
import { Input } from "../../common/FormsControl.jsx";
import { setUserData } from "../../redux/middleWares/userThunks";

// STYLED
const StyledForm = styled.form`
    overflow:hidden;
    display:flex;
    flex-direction:column;
    position:relative;
    margin-top: -100px;
    padding:10px;
    border-radius:4px;
    background:#fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    >div{
        min-height:75px;
    }
    a{
        text-align:center;
    }
`
const StyledSubmit = styled(Button)`
    margin-top:50px!important;
    color:#fff;
    background-color:#3f51b5!important;
`;
const StyledField = styled(Field)`
    width:100%;
    padding:8px;
    border:none;
    border-bottom:1px solid #000;
    outline:none;
    width: -webkit-fill-available;
`;


let maxLength30 = maxLengthCreator(30);

const Form = ({prevStep,handleSubmit,}) => {
    return (
    <Container component="main" maxWidth="xs">
        <StyledForm onSubmit={handleSubmit} >
            <StyledField autoComplete="off" labelText="First Name" validate={[required,maxLength30]} id="firstName" component={Input} name="firstName"/>

            <StyledField autoComplete="off" labelText="Last Name (optional)" id="lastName" name="lastName" component={Input}/>

            <StyledSubmit type="submit" fullWidthvariant="contained" color="primary" variant="contained">
                Sign Up
            </StyledSubmit>

            <Link href="#" onClick={prevStep}>
                {"Back to page with email"}
            </Link>
        </StyledForm>
    </Container>
    );
};

const mapActionToProps = (dispatch) => {
    return {
        setUserData: (values) => {
            dispatch(setUserData(values));
        }
    }
};

export const ReduxForm =  reduxForm({
    form: "detailForm"
})(Form);

export const FormUserDetails =  connect(null,mapActionToProps)(ReduxForm)
