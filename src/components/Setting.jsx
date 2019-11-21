import React from 'react';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';


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
        <Link href="#" onClick={logout}>
            logout
        </Link>
    </div>
};
export default Settings;

