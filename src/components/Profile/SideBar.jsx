import React from "react";

import SearchInput from "react-search-input";
import Settings from "../Setting";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/core/SvgIcon/SvgIcon";
import {Container, makeStyles} from "@material-ui/core";
import {Row} from "reactstrap";

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

export const SideBar = ({logout, searchUsers, dialogs,openSettings,handleSearch}) => {
    const classes = useStyles();

    const searchElements = searchUsers && <datalist id="users">
        searchUsers.map((item) => <option value="">item.fullName</option>
    </datalist>;
debugger
    const userDialogs = dialogs.map((item) =>
        <Grid className={classes.dialog}>
            <InputAdornment position="start">
                <AccountCircle fontSize="large"/>
            </InputAdornment>
            <Container className={classes.dialogDetails}>
                <Row row>{item.name}</Row>
                <Row row className={classes.messageText}>{item.lastMessage}</Row>
            </Container>
        </Grid>);

    return <>
        {openSettings && <Settings logout={logout}/>}

        <Grid className={classes.dialogs} xs="3" item>
            <SearchInput list="users" className={classes.search} onChange={handleSearch}/>

            <div>{searchElements}</div>

            {userDialogs}
        </Grid>
    </>
};