import React, {useState,useEffect} from "react";
import {Row } from "reactstrap";
import {Container, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchInput from "react-search-input";
import styled from "styled-components";

import "./../assets/search-input.css";

import Settings from "./Setting.jsx";

const useStyles = makeStyles(theme => ({
    main:{
        background:"#e7ebf0"
    },
    container: {
        background:"#5682a3",
        height:"50px",
        display:"flex",
        alignItems:"center",
        position:"relative"
    },
    h2:{
        margin: "1px 4rem 0"
    },
    mainContent:{
        height:"calc(100vh - 55px)",
        border:"2px solid #fff",
        borderTop: "none",
        display:"flex",
        position:"relative"
    },
    dialogs:{
        background:"#fff",
        height:"100%",
        minWidth:"300px",
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
        marginTop:"91%",
        minWidth:"100%",
        height:"50px",
        border:"none"
    }
}));

const StyledBurger = styled.button`
  position: absolute;
  top: 32%;
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 1.5rem;
    height: 0.25rem;
    background: ${({ open }) => open ? "#0D0C1D" : "#EFFFFA"};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? "rotate(45deg)" : "rotate(0)"};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? "0" : "1"};
      transform: ${({ open }) => open ? "translateX(20px)" : "translateX(0)"};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
};

export const Profile = ({logout,sendMessage,dialogs = []}) => {
    const classes = useStyles();
    // const loopOfNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];

    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState("");

    const userDialogs = dialogs.map((item) =>
                    <Grid className={classes.dialog} >
                        <InputAdornment position="start">
                            <AccountCircle fontSize="large" />
                        </InputAdornment>
                        <Container className={classes.dialogDetails}>
                            <Row row>{item.email}</Row>
                            <Row row className={classes.messageText}>Some message</Row>
                        </Container>
                    </Grid>);
    const handleEnter = (e) => {
        if(e.keyCode === 13){
            sendMessage(message)
        }
    };
    useEffect(() => {
        window.addEventListener("onkeypress",handleEnter);
        return () =>{
            window.removeEventListener("onkeypress",handleEnter);
        }
    },[message]); 

    return <div className={classes.main}>
        <Container  >
            <Grid className={classes.container} >
                <Burger open={open} setOpen={setOpen} />
                <h2 className={classes.h2}>Next Messenger</h2>
            </Grid>

            <Grid className={classes.mainContent} >
                {open && <Settings logout={logout} />}
                <Grid className={classes.dialogs} xs="3" item>
                    <SearchInput className={classes.search}  onChange={null} />
                    {userDialogs}
                </Grid>
                <Grid xs="9" item>
                    <Grid item></Grid>
                    <Grid item><textarea name="" id="" cols="30" rows="10" className={classes.textarea} onChange={(e) => setMessage(e.target.value)}></textarea></Grid>
                </Grid>
            </Grid>
        </Container>
    </div>
};

