import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CreateGroupContainer } from "../../../containers/CreateGroupContainer.jsx";
import menu from "./../../../assets/imgs/menu.png";

import {List, InfiniteLoader, AutoSizer, WindowScroller} from 'react-virtualized';

const StyledInput = styled.input`
    height: 30px
    border: none
    width:88%
`;
const Container = styled.div`
    width:100%
`

const StyledDiv = styled.div`
    padding:20px
    padding-top:40px
    width:100%
    overflow:auto
    > div{
        width:100%
        margin:1rem 0
        display: flex
    }
`;
const StyledFlexMax = styled.div`
    display:flex
    height:95%
`;

const StyledButton = styled.button`
    background: #5682a3
    color:  white
    font-size: 1em
    min-width:100px
    padding: 0.25em 1em
    border:none
    height:35px
    border-radius: 3px
`;

const StyledFlex = styled.div`
    display:flex
    position:relative
`;


const StyledButtons = styled.div`
    display:flex
    justify-content:space-between
    min-width:250px
`;

const StyledMenu = styled.div`
    display:flex;
    justify-content:space-between;
    width: calc(100% - 400px);
    position: fixed;
    padding: 10px
`;

const MyMessage = styled.div`
    justify-content: flex-end
    div{
        background:#fff
        border-radius: 13px
        padding: 10px
        width: fit-content
    }
    
`;

const FriendMessage = styled.div`
    justify-content: flex-start
    div{
        background: yellow
        width: fit-content
        padding: 10px
        border-radius: 13px
    }
`;

export const Chat = ({sendMessage, setShowGroupCreate, setShowGroupSettings, chat, clearAll, user }) => {
    
    const [message, setMessage] = useState("")

    const sendMessageFunc = (message)=> (e) =>{
        if(e.keyCode === 13 ){
            sendMessage(message);
            setMessage("");
        }
    }

    useEffect(() => {
        const callback = sendMessageFunc(message);
        window.addEventListener('keydown', callback);
        return () => {
            window.removeEventListener('keydown', callback);
        }
    }, [message]);
    const messages = chat && chat.messages.map((msg) => {
        if (msg.sender === user.name) {
            return <MyMessage key={msg.id}><div>{msg.text}</div></MyMessage>
        }
        else {
            return <FriendMessage key={msg.id}><div>{msg.text}</div></FriendMessage>
        }
    });

    const openGroup = () => {
        if (chat.type === "group") {
            setShowGroupSettings(true)
        }
    }

    return <Container>
        <CreateGroupContainer setShowGroupCreate={setShowGroupCreate} activeChat={chat} />

        <StyledFlexMax>
            <StyledMenu>
                <StyledButtons>
                    <StyledButton onClick={() => clearAll(chat._id)}>Clear</StyledButton>
                    <StyledButton onClick={() => setShowGroupCreate(true)}>Create group</StyledButton>
                </StyledButtons>
                <div>
                    <img src={menu} alt="menu" onClick={openGroup} />
                </div>
            </StyledMenu>   
            <StyledDiv>
                <List
                    height="15"
                    rowCount="15"
                    rowRenderer={({index}) => {
                    const msg = messages[index];
                        if (msg.sender === user.name) {
                            return <MyMessage key={msg.id}><div>{msg.text}</div></MyMessage>
                        }
                        else {
                            return <FriendMessage key={msg.id}><div>{msg.text}</div></FriendMessage>
                        }
                    
                    }}
                />
                
            </StyledDiv>
        </StyledFlexMax>

        <StyledFlex>
            <StyledInput  value={message} onChange={(e) => setMessage(e.target.value)} />
            <StyledButton onClick={() => sendMessage(message)}>Send</StyledButton>
        </StyledFlex>

    </Container>
};

