import React from 'react';
import {reduxForm, stopSubmit, Field} from "redux-form";
import {connect} from 'react-redux';
import styled from "styled-components";
// MATERIAL UI
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
// COMPONENTS 
import {Input} from "../../common/FormsControl.jsx";
import {required} from "../../validators/required";
import {maxLengthCreator} from "../../validators/maxLengthCreator";
import {minLengthCreator} from "../../validators/minLength";
import {regexEmail} from "../../validators/regexEmail";
import {sendEmailThunk} from '../../redux/middleWares/userThunks';

// STYLED
const StyledForm = styled.form`
    overflow:hidden;
    display:flex;
    flex-direction:column;
    border-radius:4px;
    position:relative;
    margin-top: -100px;
    padding:10px;
    background:#fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    >div{
        min-height:75px;
    }
`
const StyledSubmit = styled(Button)`
    margin-top:50px!important;
    margin-bottom:5px!important;
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
let minLength7 = minLengthCreator(7);

let Form = ({handleSubmit, ...props}) => {
    return (
        <Container component="main" maxWidth="xs">
            <StyledForm onSubmit={handleSubmit} className="form-content">
                <FormControl>
                    <StyledField labelText="Input your email address" type="text" id="email" name="email" validate={[required, maxLength30, regexEmail]} component={Input} />
                    {
                        // startAdornment={
                        //     <InputAdornment position="start">
                        //        <AccountCircle/>
                        //     </InputAdornment>
                        // }
                    }
                </FormControl>

                <FormControl>
                    <StyledField labelText="Input password" id="password" name="password" component={Input} validate={[required, minLength7]} autoComplete="off"/>

                </FormControl>

                {props.error && <p>{props.error}</p>}

                <StyledSubmit type="submit"  variant="contained" color="primary">
                    Sign Up
                </StyledSubmit>

                <Link href='/login' variant="body2" align="center">
                    {"Back to Sign In"}
                </Link>
            </StyledForm>
        </Container>
    );
};

let ReduxForm = reduxForm({
    form: "emailPassword"
})(Form);

const FormEmailPassword = ({sendEmailThunk, accessCode, ...props}) => {
    const onSubmit = async (values) => {
        stopSubmit("emailPassword");
        sendEmailThunk(values);
    };

    return <ReduxForm {...props} onSubmit={onSubmit}/>
};
const mapActionToProps = (dispatch) => {
    return {
        sendEmailThunk: (values) => {
            dispatch(sendEmailThunk(values));
        }
    }
};
export const FormWithConnect = connect(null, mapActionToProps)(FormEmailPassword)