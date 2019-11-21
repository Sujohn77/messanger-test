import React from "react";

import SearchInput from "react-search-input";
import Settings from "../Setting";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/core/SvgIcon/SvgIcon";
import {Container, makeStyles} from "@material-ui/core";
import {Row} from "reactstrap";
import styled from "styled-components";

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
            cursor:pointer,
            background:lightgrey;
            transition:.3s all;
        }
    }
`


const useStyles = makeStyles(theme => ({
    dialogs: {
        background: "#fff",
        height: "100%",
        minWidth: "300px",
        padding: "8px"
    },
    dialog: {
        height: "55px",
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        borderTop: "none",
        marginBottom: "7px",
    },
    dialogDetails: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        padding: "0 10px"
    },
    messageText: {
        fontSize: "15px"
    },
    search: {
        marginBottom: "10px"
    },
}));

export const SideBar = ({logout, addFriend, searchItems, dialogs,openSettings,handleSearch}) => {
    const classes = useStyles();
    
    const searchElements = searchItems &&  
        searchItems.map((item) => <div>
            <div key={item.id}>{item.email}</div>
            <button onClick={() => {addFriend(item.email)}}>Add</button>
        </div>);
    
    
    const userDialogs = dialogs !== null && dialogs.map((item) =>
        <Grid className={classes.dialog}>
            <InputAdornment position="start">
                <AccountCircle fontSize="large"/>
            </InputAdornment>
            <Container className={classes.dialogDetails}>
                <Row row>{item.chatName}</Row>
                <Row row className={classes.messageText}>{item.lastMessage}</Row>
            </Container>
        </Grid>);

    return <>
        {openSettings && <Settings logout={logout}/>}

        <Grid className={classes.dialogs} xs="3" item>
            <SearchInput list="users" className={classes.search} onChange={handleSearch} />

            <StyledSearchUsers id="users">{searchElements}</StyledSearchUsers>

            {userDialogs}
        </Grid>
    </>
};