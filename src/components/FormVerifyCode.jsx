import React, {useState, useEffect, useCallback} from 'react';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from "@material-ui/core/Container";
// REDUX FORM
import {TextField} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        overflow:"hidden"
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

let FormVerifyCode = ({prevStep,nextStep,verifyCode}) => {
    const [code,setCode] = useState("");
    const [error,setError] = useState(false);
    const memoizedCallBack = useCallback(() => {
        verify(code);
    },[code]);
    const handleChange = (e) => {
        setCode(e.target.value);
        memoizedCallBack();
        if(error){
            setError(false);
        }
    };

    const verify = async (code) => {
        if(code.length === 7){
            let result = await verifyCode(code);
            debugger
            if(result === "OK"){
                nextStep();
            }
            else{
                setError(true);
            }
        }
        else{
            if(error){
                setError(false);
            }
        }
    };

    // useEffect((e)=>{
    //     debugger
    //     setCode(e.value);
    //     if(code.length === 7){
    //         let result = verifyCode();
    //         if(result === "OK"){
    //             nextStep();
    //         }
    //         else{
    //             setError(true);
    //         }
    //     }else{
    //         if(error){
    //             setError(false);
    //         }
    //     }
    //
    // },[code]);

    const classes = useStyles();

    return (<Container component="main" maxWidth="xs">
            <FormControl className={classes.paper}>
                <h4>We send code on your email, copy and paste him in the field. </h4>
                <TextField id="firstName"
                       name="firstName" onChange={handleChange}
                           maxLength="7"
                       className={classes.input}/>
                {error && <p className={classes.error}>Wrong code</p>}
            </FormControl>
        </Container>
    );
};

export default FormVerifyCode;
