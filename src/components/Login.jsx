import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form, ErrorMessage} from 'formik';
import { withFetchData } from "./../hoc/withFetchData.jsx";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(-20),
        border: '1px solid #e6e6e6',
        padding: '15px',
        background: '#fff',
        borderRadius: '4px',
        height:"300px",
        width:"364px",
        flexDirection: 'column'
    },
    container:{
        display: 'flex',
        justifyContent:"center"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),

    },
    h1:{
        textAlign:"center"
    },
    input:{
        width: "100%",
        animationName: "MuiInputBase-keyframes-auto-fill-cancel",
        webkitTapHighlightColor: "transparent",
        display:"flex",
        textAlign:"center",
        justifyContent:"center"
    }
}));

let SignIn = ({sendEmailMessage}) =>{
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5" className={classes.h1}>
                    Login
                </Typography>
                <Formik
                    initialValues={{ email: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}>
                    {({ isSubmitting }) => (
                        <Form>
                            <TextField
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
                                autoFocus
                            />
                            <ErrorMessage name="email" component="div" />
                            <TextField
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
                            />
                            <ErrorMessage name="email" component="div" />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isSubmitting}
                                onClick={sendEmailMessage}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default SignIn = withFetchData(SignIn);
