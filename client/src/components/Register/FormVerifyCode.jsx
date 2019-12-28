import React, {useState} from "react";
// MATERIAL UI
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
// REDUX FORM
import {TextField} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        overflow: "hidden",
        maxWidth:"348px"
    },
    paper: {
        margin: theme.spacing(1),
        marginTop: "-100px",
        display: "flex",
        border: "1px solid #e6e6e6",
        height: "244px",
        padding: "15px",
        width:"348px",
        
        background: "#fff",
        borderRadius: "4px",
        position: "relative",
    },
    label: {
        fontSize: "18px",
        position: "relative",
        marginTop: "10px",
        transform: "translate(0, 0px) scale(1)"
    },
    submit: {
        marginTop: "-100px",
    },
    input: {
        width: "100%"
    }
}));

export const FormVerifyCode = ({verifyCode}) => {
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setError("");
        if (e.target.value.length === 6) {
            verifyCode(e.target.value);
        }
    };

    const classes = useStyles();
    return (<Container component="main" maxWidth="xs">
            <FormControl className={classes.paper}>
                <h4>We send code on your email, copy and paste him in the field. </h4>
                <TextField id="firstName"
                           name="firstName" onChange={handleChange}
                           maxLength="7"
                           className={classes.input}/>
                <div>
                    <Link onClick={() => {window.location.reload()}}>Go to last page</Link>
                </div>
                {error && <p className={classes.error}>Wrong code</p>}
            </FormControl>
        </Container>
    );
};
