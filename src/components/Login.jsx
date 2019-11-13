import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import withAuthRedirect from "../hoc/withAuthRedirect.jsx";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(-20),
        border: '1px solid #e6e6e6',
        margin: '15px',
        background: '#fff',
        borderRadius: '4px',
        height:"300px",
        width:"364px",
        flexDirection: 'column',
        overflow:"hidden"
    },
    container:{
        display: 'flex',
        justifyContent:"center",
    },
    form: {
        width: '', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        overflow: "hidden",
        margin:"15px"
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
    }
}));

const SignIn = ({signIn}) =>{
    const classes = useStyles();


    return <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.h1}>
                    Login
                </Typography>
                <form onSubmit={signIn} className={classes.form}>
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

export default SignIn;
