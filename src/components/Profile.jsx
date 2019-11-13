import React, {useState} from 'react';
import {Row } from 'reactstrap';
import {Container, makeStyles} from "@material-ui/core";
import HamburgerMenu from "react-hamburger-menu/dist/HamburgerMenu";
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchInput from "react-search-input";

import "./../assets/search-input.css";
import {withAuthRedirect} from "../hoc/withAuthRedirect.jsx";

const useStyles = makeStyles(theme => ({
    main:{
        background:"#e7ebf0",
        minHeight: "100vh"
    },
    container: {
        background:"#5682a3",
        height:"50px",
        display:"flex",
        alignItems:"center"
    },
    h2:{
        margin: "1px 2rem 0"
    },
    mainContent:{
        height:"calc(100vh - 50px)",
        border:"2px solid #fff",
        borderTop: "none",
        display:"flex",

    },
    dialogs:{
        background:"#fff",
        height:"100%"
    },
    dialog: {
        height: "55px",
        display:"flex",
        alignItems:"center",
        padding:"0 10px",
        borderTop:"none",
        marginBottom: "7px",
    },
    dialogDetails: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        height:"100%",
        padding: "0 10px"
    },
    messageText:{
        fontSize:"15px"
    },
    search:{
        marginBottom: "10px"
    },
    textarea: {
        marginTop:"96%",
        minWidth:"100%",
        height:"50px",
        border:"none"
    }
}));


export const Profile = (props) => {
    const classes = useStyles();

    const [open,setOpen] = useState(false);

    let loopOfNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];

    return <div className={classes.main}>
        <Container  >

            <Container className={classes.container} >

                <HamburgerMenu
                    isOpen={open}
                    menuClicked={setOpen}
                    width={18}
                    height={15}
                    strokeWidth={2}
                    rotate={0}
                    color='black'
                    borderRadius={0}
                    animationDuration={0.5}
                />
                <h2 className={classes.h2}>Next Messenger</h2>

            </Container>

            <Grid className={classes.mainContent} >

                <Grid className={classes.dialogs} xs="3" item>
                    <SearchInput className={classes.search}  onChange={null} />
                {
                    loopOfNumbers.map(() =>
                            <Grid className={classes.dialog} >
                                <InputAdornment position="start">
                                    <AccountCircle fontSize="large" />
                                </InputAdornment>
                                <Container className={classes.dialogDetails}>
                                    <Row row>Andrey</Row>
                                    <Row row className={classes.messageText}>Some message</Row>
                                </Container>
                            </Grid>)
                }
                </Grid>
                <Grid xs="9" item>
                    <textarea name="" id="" cols="30" rows="10" className={classes.textarea}></textarea>
                </Grid>
            </Grid>
        </Container>
    </div>
};

