import React from 'react';
import classNames from "classnames";
import {reduxForm, stopSubmit, Field} from "redux-form";
import * as axios from "axios";

import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Link from "@material-ui/core/Link";

import {Input} from "./../common/FormsControl.jsx";
import {required} from "../validators/required";
import {maxLengthCreator} from "../validators/maxLengthCreator";
import {minLengthCreator} from "../validators/minLength";
import {RegexEmail} from "../validators/RegexEmail";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
        label: {
            width: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing(-20),
        border: '1px solid #e6e6e6',
        margin: '15px',
        background: '#fff',
        borderRadius: '4px',
        height: "300px",
        width: "364px",
        flexDirection: 'column',
        overflow: "hidden"
    },
    container: {
        display: 'flex',
        justifyContent: "center",
    },
    form: {
        width: 'auto', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        overflow: "hidden",
        margin: "15px"
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    h1: {
        textAlign: "center",
        margin: "0rem"
    },
    input: {
        width: "100%",
        animationName: "MuiInputBase-keyframes-auto-fill-cancel",
        webkitTapHighlightColor: "transparent",
    }
}));

let maxLength30 = maxLengthCreator(30);
let minLength7 = minLengthCreator(7);

const renderTextField = ({label, input, meta: {touched, invalid, error}, ...custom}) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);

let Form = ({handleSubmit, ...props}) => {
    const classes = useStyles();

    return (<Container component="main" maxWidth="xs" className={classes.container}>
            <div className={classes.paper}>
                <h1 className={classes.h1}>
                    Login
                </h1>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Field component={renderTextField}
                           className={classes.input}
                           type="email"
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           autoComplete="email"
                           autoFocus/>

                    <Field
                        className={classes.input}
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        component={renderTextField}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {/*Forgot password?*/}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const ReduxForm = reduxForm({
    form: 'emailPasswordLogin'
})(Form);

const FormEmailPasswordLogin = (props) => {
    return <ReduxForm {...props} onSubmit={props.onSubmit}/>
};

export default FormEmailPasswordLogin;