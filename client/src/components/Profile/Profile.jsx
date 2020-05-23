import React, { useState } from "react";

import { Container, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";

import { Header } from "./Header/Header.jsx";
import { SidebarContainer } from "./../../containers/SidebarContainer.jsx";
import { ChatContainer } from "./../../containers/ChatContainer.jsx";
import { CreateGroupContainer } from "../../containers/CreateGroupContainer.jsx";

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

const StyledButton = styled.button`
    background: #5682a3
    color:  white
    font-size: 1em
    min-width:150px
    padding: 0.25em 1em
    border:none
    height:50px
    border-radius: 3px
`;

export const Profile = ({setShowGroupCreate,setShowGroupSettings,setScrollTopActiveChat,logout,list, clearAll,setStartActual,setEndActual, sendMessage, setScroll,scrollAfterAddMessage,startIndexMessagesLoaded,endIndexMessagesLoaded,
                        activeChat,setActiveChat,handleSearch }) => {
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
                        <SidebarContainer 
                            setActiveChat={setActiveChat}
                            activeChat={activeChat}
                            logout={logout}
                            openSettings={openSettings}
                            handleSearch={handleSearch} />
                        {activeChat && <ChatContainer clearAll={clearAll}
                        startIndexMessagesLoaded={startIndexMessagesLoaded}
                        endIndexMessagesLoaded={endIndexMessagesLoaded}
                            list={list}
                            setStartActual={setStartActual}
                            setScroll={setScroll}
                            setEndActual={setEndActual}
                            scrollAfterAddMessage={scrollAfterAddMessage}
                            setScrollTopActiveChat={setScrollTopActiveChat}
                            setShowGroupCreate={setShowGroupCreate}
                            setShowGroupSettings={setShowGroupSettings}
                            activeChat={activeChat}
                            sendMessage={sendMessage} />}
                            {!activeChat && <div>   
                        <StyledButton onClick={() =>{ debugger;setShowGroupCreate(true)}}>Create group</StyledButton></div>  }
                        <CreateGroupContainer setShowGroupCreate={setShowGroupCreate} activeChat={activeChat} />
                    </Grid>
                </Grid>
            </Container>
        </StyledDiv>
    );
};