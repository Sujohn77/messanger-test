import React, {useState} from "react";

import {Container, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";

import "../../assets/search-input.css";

import {Header} from "./Header/Header.jsx";
import {SideBar} from "./SideBar";
import {Main} from "./Main.jsx";

const StyledDiv = styled.div`
     background: #e7ebf0   
`;

const useStyles = makeStyles(theme => ({
    container: {
        background: "#5682a3",
        height: "50px",
        display: "flex",
        alignItems: "center",
        position: "relative"
    },
    mainContent: {
        height: "calc(100vh - 55px)",
        border: "2px solid #fff",
        borderTop: "none",
        display: "flex",
        position: "relative"
    },
}));

export const Profile = ({logout, sendMessage, dialogs = [], searchUsers,handleSearch}) => {
    const classes = useStyles();

    const [openSettings, setOpenSettings] = useState(false);

    return (
        <StyledDiv>
            <Container>
                <Grid>
                    <Grid className={classes.container}>
                        <Header openSettings={openSettings} setOpenSettings={setOpenSettings}/>
                    </Grid>
                    <Grid className={classes.mainContent}>
                        <SideBar logout={logout} searchUsers={searchUsers} dialogs={dialogs} openSettings={openSettings} handleSearch={handleSearch}/>
                        <Main sendMessage={sendMessage}/>
                    </Grid>
                </Grid>
            </Container>
        </StyledDiv>
    );
};