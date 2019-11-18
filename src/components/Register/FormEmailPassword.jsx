import React from 'react';
import {reduxForm, stopSubmit, Field} from "redux-form";
import {connect} from 'react-redux';
import classNames from "classnames";

import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import {Input} from "../../common/FormsControl.jsx";
import {required} from "../../validators/required";
import {maxLengthCreator} from "../../validators/maxLengthCreator";
import {minLengthCreator} from "../../validators/minLength";
import {regexEmail} from "../../validators/regexEmail";
import {sendEmailThunk} from '../../redux/middleWares/userThunks';

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
        height: "250px",
        padding: '15px',
        background: '#fff',
        borderRadius: '4px',
        position: "relative",
        flexDirection: 'column',
        justifyContent: "center",
    },
    label: {
        fontSize: "20px",
        position: "relative",
        marginBottom: "20px"
    },
    submit: {
        marginTop: "calc(100% - 305px)",
        marginBottom: "10px"
    },
    input: {
        marginTop: "0"
    }
}));

let maxLength30 = maxLengthCreator(30);
let minLength7 = minLengthCreator(7);

let Form = ({handleSubmit, ...props}) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit} className={classNames(classes.paper, "form-content")}>
                <FormControl>
                    <InputLabel htmlFor="email" className={classes.label}>Input your email address</InputLabel>
                    <Field type="text" id="email" name="email"
                           validate={[required, maxLength30, regexEmail]}
                        // startAdornment={
                        //     <InputAdornment position="start">
                        //        <AccountCircle/>
                        //     </InputAdornment>
                        // }
                           component={Input}
                           className={classes.input}/>
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="password" className={classes.label}>Input password</InputLabel>
                    <Field id="password" name="password"
                           component={Input}
                           validate={[required, minLength7]}
                           className={classes.input}/>

                </FormControl>
                {props.error && <p>{props.error}</p>}
                <Button type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                    Sign Up
                </Button>

                <Link href='/login' variant="body2" align="center">
                    {"Back to Sign In"}
                </Link>
            </form>
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