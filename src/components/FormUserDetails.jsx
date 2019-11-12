import React from 'react';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
// REDUX FORM
import {reduxForm,Field} from "redux-form";
import {required} from "../validators/required";
import {maxLengthCreator} from "../validators/maxLengthCreator";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    paper: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(-20),
        display: 'flex',
        border: '1px solid #e6e6e6',
        height:"250px",
        padding: '15px',
        background: '#fff',
        borderRadius: '4px',
        position:"relative",
    },
    label: {
        fontSize: "18px",
        position: "relative",
        marginTop:"10px",
        transform: "translate(0, 0px) scale(1)"
    },
    submit: {
        marginTop: "calc(100% - 265px)",
    },
    input:{
        width:"100%"
    }
}));

let maxLength30 = maxLengthCreator(30);

let FormUserDetails = ({handleSubmit,captcha,signUp,...props}) => {
    const classes = useStyles();

    return (<Container component="main" maxWidth="xs">
                <FormControl className={classes.paper}>
                    <form>
                        <InputLabel htmlFor="firstName" className={classes.label}>First Name</InputLabel>

                        <Field validate={[required,maxLength30]}
                               component={"input"} name="firstName"
                               className={classes.input}/>

                        <InputLabel htmlFor="lastName" className={classes.label}>Last Name (optional)</InputLabel>

                        <Field validate={[required,maxLength30]}
                               id="lastName"
                               name="lastName"
                               component={"input"}
                               className={classes.input}/>

                        <Button type="submit"
                                onClick={signUp}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                            Sign Up
                        </Button>
                    </form>
                </FormControl>
            </Container>
    );
};
 FormUserDetails =  reduxForm({
    form: 'detail-form'
})(FormUserDetails);

export default FormUserDetails;
