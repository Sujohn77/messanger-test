import React from "react";

import SearchInput from "react-search-input";
import Settings from "../Setting.jsx";
import Grid from "@material-ui/core/Grid";
import { Container, makeStyles } from "@material-ui/core";
import { Row } from "reactstrap";
import styled from "styled-components";

import logoUser from "./../../assets/imgs/logoUser.png";
import logoGroup from "./../../assets/imgs/logoGroup.png";

const StyledSearchUsers = styled.div`
    padding: 8px;
    justify-content: space-between;
    button  {
        border-radius: 4px;
        height: 20px;
        width:60px;
        background-color: lightblue;
        color:#fff;
        border:none;
        font-weight:600;
    }
    div {
        display: flex;
        justify-content:space-between;
        
        height:30px;
        &:hover {
            cursor:pointer
            background:lightgrey
            transition:.3s all
        }
    }
`
const StyledDialog = styled.div`
    height: 55px
    display: flex
    align-items: center
    border-top: none
    cursor:pointer
    &:hover{
        background:lightgrey
        transition:.3s all
    }
`
const useStyles = makeStyles(theme => ({
    dialogs: {
        background: "#fff",
        height: "100%",
        minWidth: "300px",
    },
    dialog: {
        height: "55px",
        display: "flex",
        alignItems: "center",
        borderTop: "none",
    },
    activeDialog: {
        height: "55px",
        display: "flex",
        alignItems: "center",
        borderTop: "none",

        background: "#5682a3"
    },
    dialogDetails: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "0 10px"
    },
    messageText: {
        fontSize: "15px"
    },
    search: {
        margin: "20px 0"
    },
}));

export const Sidebar = ({ logout, setActiveChat, activeChat, addFriend, searchItems, chats, openSettings, handleSearch }) => {
    const classes = useStyles();

    const searchElements = searchItems &&
        searchItems.map((item) => <div key={item.id}>
            <div>{item.firstName + " " + item.lastName}</div>
            <div>{item.email}</div>
            <button onClick={() => { addFriend(item.email) }}>Add</button>
        </div>);


    const userChats = chats && chats.map((item) => {
        
         if(activeChat === item){
             return <StyledDialog key={item._id} className={classes.activeDialog} onClick={() => setActiveChat(item)}>
            <img src={(item.type === "group")?logoGroup:logoUser} alt="logo-user" width="45" height="45" />
            <Container className={classes.dialogDetails}>
                <Row row>{item.name}</Row>
                <Row row className={classes.messageText}>{item.messages.length > 0 && item.messages[item.messages.length-1].text}</Row>
            </Container>
        </StyledDialog>
        }
        else{
            return <StyledDialog key={item._id} className={classes.dialog} onClick={() => setActiveChat(item)}>
            <img src={(item.type === "group")?logoGroup:logoUser} alt="logo-user" width="45" height="45" />
            <Container className={classes.dialogDetails}>
                <Row row>{item.name}</Row>
                <Row row className={classes.messageText}>{item.messages.length > 0 && item.messages[item.messages.length-1].text}</Row>
            </Container>
        </StyledDialog>
        }
  
    });

    return <>
        {openSettings && <Settings logout={logout} />}

        <Grid className={classes.dialogs} xs="3" item>
            <SearchInput list="users" className={classes.search} onChange={handleSearch} />

            <StyledSearchUsers id="users">{searchElements}</StyledSearchUsers>

            {userChats}
        </Grid>
    </>
};