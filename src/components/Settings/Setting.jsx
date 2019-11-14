import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    paper : {
        width: "320px",
        height:"400px",
        background:"#fff",
        display:"flex",
        padding:"15px",
        position:"absolute"
    }
}));

const Settings = ({logout}) =>{
    const classes = useStyles();

    return <div className={classes.paper}>
        <a href="#" onClick={logout}>
            logout
        </a>
    </div>
};
export default Settings;

