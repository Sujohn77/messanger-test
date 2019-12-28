import React from "react";
import styled from "styled-components";
import { CreateGroupContainer } from "../../../containers/CreateGroupContainer.jsx";
import menu from "./../../../assets/imgs/menu.png";
import {MessagesContainer} from "./../../../containers/MessagesContainer.jsx";


const StyledInput = styled.input`
    height: 30px
    border: none
    margin-top:0
`;
const Container = styled.div`
    width:100%
    > div {
        display:flex
        position:relative
    }
    > div:first-child {
        flex-direction:column;
        min-height:calc(100vh - 100px);
        max-height:calc(100vh - 100px);
    }
`


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

const StyledButtons = styled.div`
    display:flex
    justify-content:space-between
    min-width:320px
    >button{
        height:35px
    }
`;

const StyledMenu = styled.div`
    display:flex;
    justify-content:space-between;
    max-width: 900px;
    padding: 10px;
    padding-bottom:none
`;


export const Chat = ({sendMessage, user,activeChatId,scrollAfterAddMessage,setScroll,messagesLength,savePositionChat,startIndex,setStartIndex,endIndex,setEndIndex,
     hasNextPage,list, isNextPageLoading,setScrollTopActiveChat,loadNextPage,setEndActual, setShowGroupCreate, message, setStartActual,activeChat, clearAll, openGroup, setMessage, startIndexMessagesLoaded,endIndexMessagesLoaded}) => {
        
  return <>
        <Container>    
            <div>
                <StyledMenu>
                    <StyledButtons>
                        <StyledButton onClick={() => clearAll(activeChat._id)}>Clear</StyledButton>
                        <StyledButton onClick={() => setShowGroupCreate(true)}>Create group</StyledButton>
                    </StyledButtons>
                    <div>
                        <img src={menu} alt="menu" onClick={openGroup} />
                    </div>
                </StyledMenu>  
                
                {activeChat && <MessagesContainer chatId={activeChatId}
                setEndActual={setEndActual}
                setScrollTopActiveChat={setScrollTopActiveChat}
                setStartActual={setStartActual}
                            startIndexMessagesLoaded={startIndexMessagesLoaded}
                            endIndexMessagesLoaded={endIndexMessagesLoaded}
                            startIndex={startIndex}
                            endIndex={endIndex}
                            setEndIndex={setEndIndex}
                            setStartIndex={setStartIndex}
                            savePositionChat={savePositionChat}
                            myName={user.name}
                            scrollTopChat={activeChat.position}
                            scrollAfterAddMessage={scrollAfterAddMessage}
                            setScroll={setScroll}
                            listItems={list} 
                            messagesLength={messagesLength}
                            hasNextPage={hasNextPage}
                            loadNextPage={loadNextPage} 
                            isNextPageLoading={isNextPageLoading}/>}
            </div>

            <div>
                <StyledInput  value={message} onChange={(e) => setMessage(e.target.value)} />
                <StyledButton onClick={() => sendMessage(message)}>Send</StyledButton>
            </div>
        </Container>
        <CreateGroupContainer setShowGroupCreate={setShowGroupCreate} activeChat={activeChat} />
    </>
};

