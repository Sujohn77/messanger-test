import React from "react";
import {connect} from 'react-redux';
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
// REDUX FORM
import {reduxForm,Field} from "redux-form";
import {required} from "../../validators/required";
import {maxLengthCreator} from "../../validators/maxLengthCreator";
import Link from "@material-ui/core/Link";
import { Input } from "../../common/FormsControl.jsx";
import { setUserData } from "../../redux/middleWares/userThunks";

const useStyles = makeStyles(theme => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        overflow:"hidden",
    },
    paper: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(-20),
        display: "flex",
        border: "1px solid #e6e6e6",
        height:"250px",
        padding: "15px",
        background: "#fff",
        
        borderRadius: "4px",
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
        marginBottom: "10px"
    },
    input:{
        width:"100%"
    }
}));

let maxLength30 = maxLengthCreator(30);

const Form = ({prevStep,handleSubmit,}) => {
    const classes = useStyles();

    return (<Container component="main" maxWidth="xs">
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <InputLabel htmlFor="firstName" className={classes.label}>First Name</InputLabel>
                        <Field validate={[required,maxLength30]}
                               id="firstName"
                               component={Input}
                               name="firstName"
                               className={classes.input}/>

                        <InputLabel htmlFor="lastName" className={classes.label}>Last Name (optional)</InputLabel>

                        <Field
                               id="lastName"
                               name="lastName"
                               component={Input}
                               className={classes.input}/>

                        <Button type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                            Sign Up
                        </Button>
                        <Link href="#" onClick={prevStep}>
                            {"Back to page with email"}
                        </Link>
                    </form>
            </Container>
    );
};
const mapActionToProps = (dispatch) => {
    return {
        setUserData: (values) => {
            dispatch(setUserData(values));
        }
    }
};
export const ReduxForm =  reduxForm({
    form: "detailForm"
})(Form);

export const FormUserDetails =  connect(null,mapActionToProps)(ReduxForm)
