import React, { useState } from "react";

import { Container, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";

import { Header } from "./Header/Header.jsx";
import { SideBar } from "./SideBar.jsx";
import { Chat } from "./Chat/Chat.jsx";

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
        borderLeft: "none",
        borderTop: "none",
        display: "flex",
        position: "relative"
    },
}));

export const Profile = ({ logout,setShowGroupCreate,setShowGroupSettings, setActiveChat, addFriend, clearAll, user, sendMessage, activeChat, chats = [], searchItems, handleSearch }) => {
    const classes = useStyles();

    const [openSettings, setOpenSettings] = useState(false);
    
    return (
        <StyledDiv>
            <Container>
                <Grid>
                    <Grid className={classes.container}>
                        <Header openSettings={openSettings}
                            setOpenSettings={setOpenSettings} />
                    </Grid>
                    <Grid className={classes.mainContent}>
                        <SideBar addFriend={addFriend}
                            setActiveChat={setActiveChat}
                            activeChat={activeChat}
                            logout={logout}
                            searchItems={searchItems}
                            chats={chats}
                            openSettings={openSettings}
                            handleSearch={handleSearch} />
                        <Chat clearAll={clearAll}
                            setShowGroupCreate={setShowGroupCreate}
                            setShowGroupSettings={setShowGroupSettings}
                            user={user}
                            chat={activeChat}
                            sendMessage={sendMessage} />
                    </Grid>
                </Grid>
            </Container>
        </StyledDiv>
    );
};