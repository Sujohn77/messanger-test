import React, { useState } from "react";
import styled from "styled-components";
// import {Grid} from "./../../common/Grid.jsx";

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
    width:100px
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

export const Chat = ({ sendMessage, chat, clearAll, user }) => {
    const [message, setMessage] = useState("")
    const messages = chat && chat.messages.map((msg) => {
        if (msg.sender === user.name) {
            return <MyMessage key={msg.id}><div>{msg.text}</div></MyMessage>
        }
        else {
            return <FriendMessage key={msg.id}><div>{msg.text}</div></FriendMessage>
        }
    });

    return <Container>
        <StyledFlexMax>
            <StyledDiv>
                <StyledButton onClick={() => clearAll(chat._id)}>Clear</StyledButton>
                {messages}
            </StyledDiv>
        </StyledFlexMax>

        <StyledFlex>
            <StyledInput onChange={(e) => setMessage(e.target.value)} />
            <StyledButton onClick={() => sendMessage(message)}>Send</StyledButton>
        </StyledFlex>
    </Container>
};

