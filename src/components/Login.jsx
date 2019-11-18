import React from 'react';
import {Field, reduxForm} from "redux-form";

import {maxLengthCreator} from "../validators/maxLengthCreator";
import {minLengthCreator} from "../validators/minLength";
import {required} from "../validators/required";

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

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

const Form = ({handleSubmit}) => {
    const classes = useStyles();

    return <Container component="main" maxWidth="xs" className={classes.container}>
        <div className={classes.paper}>
            <h1 className={classes.h1}>
                Login
            </h1>
            <form onSubmit={handleSubmit} className={classes.form}>
                <Field component={"input"}
                       className={classes.input}
                       validate={[maxLength30,required]}
                       type="email"
                       name="email"/>

                <Field component={"input"}
                       className={classes.input}
                       validate={[minLength7,required]}
                       type="password"
                       name="password"/>
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
};

export const SignIn = reduxForm({
    form: "login"
})(Form);