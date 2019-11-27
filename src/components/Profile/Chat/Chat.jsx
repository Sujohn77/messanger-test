import React, { useState } from "react";
import styled from "styled-components";
import { CreateGroupContainer } from "../../../containers/CreateGroupContainer.jsx";
import menu from "./../../../assets/imgs/menu.png";

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
    width:100%
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
    border-radius: 3px
`;

const StyledFlex = styled.div`
    display:flex
    position:relative
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

export const Chat = ({sendMessage,setShowGroupCreate, setShowGroupSettings, chat, clearAll, user }) => {
    
    const [message, setMessage] = useState("")

    const messages = chat && chat.messages.map((msg) => {
        if (msg.sender === user.name) {
            return <MyMessage key={msg.id}><div>{msg.text}</div></MyMessage>
        }
        else {
            return <FriendMessage key={msg.id}><div>{msg.text}</div></FriendMessage>
        }
    });

    const openGroup = () => {
        
        if(chat.type === "group"){
            setShowGroupSettings(true)
        }
    }

    return <Container>
        <CreateGroupContainer setShowGroupCreate={setShowGroupCreate} chat={chat}/>

        <StyledFlexMax>
            <StyledDiv>
                <StyledButton onClick={() => clearAll(chat._id)}>Clear</StyledButton>
                <StyledButton onClick={() => setShowGroupCreate(true)}>Create group</StyledButton>
                <img src={menu} alt="menu" onClick={openGroup}/>
                {messages}
            </StyledDiv>
        </StyledFlexMax>

        <StyledFlex>
            <StyledInput onChange={(e) => setMessage(e.target.value)} />
            <StyledButton onClick={() => sendMessage(message)}>Send</StyledButton>
        </StyledFlex>

    </Container>
};

