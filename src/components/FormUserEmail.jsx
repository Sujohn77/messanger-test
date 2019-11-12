import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withFetchData } from "../hoc/withFetchData.jsx";
import Link from "@material-ui/core/Link";
import {checkExistEmail} from "./CheckExistEmail.jsx";
import {reduxForm} from "redux-form";
import FormUserDetails from "./FormUserDetails";

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
        marginBottom:"10px"
    },
    input: {
        marginTop: "0"
    }
}));

let FormUserEmail = ({checkUserEmail,nextStep,...props}) => {
    const classes = useStyles();

    const verifyEmail =  (values) => async (e) => {
        e.preventDefault();
        let res = await checkUserEmail(values); // HOC CALLBACK IN ORDER TO SEND EMAIL
        nextStep(); // TO THE NEXT FORM
    };

    return (<Container component="main" maxWidth="xs">
            <form action="">
                <FormControl className={classes.paper}>
                    <InputLabel htmlFor="email" className={classes.label}>Input your email address</InputLabel>
                    <Input id="email" name="email"
                           className={classes.input}
                           startAdornment={
                               <InputAdornment position="start">
                                   <AccountCircle />
                               </InputAdornment>
                           }
                    />
                    <InputLabel htmlFor="password" className={classes.label}>Input password</InputLabel>
                    <Input id="password" name="password"
                           className={classes.input}
                    />
                    <Button type="submit"
                            onClick={verifyEmail}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                        Sign Up
                    </Button>
                    <Link href="/login" variant="body2" align="center">
                        {"Back to Sign In"}
                    </Link>
                </FormControl>
            </form>
            </Container>
    );
};

FormUserEmail =  reduxForm({
    form: 'detail-form'
})(FormUserEmail);

export default FormUserEmail = checkExistEmail(FormUserEmail);