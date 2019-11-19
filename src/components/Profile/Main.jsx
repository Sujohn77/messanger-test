import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

import "../../assets/search-input.css";

const StyledTextarea = styled.textarea`
    margin-top: 89%
    min-width: -webkit-fill-available
    height: 50px
    border: none
`;

const StyledDiv = styled.div`
    padding:20px
`;

export const Main = ({sendMessage}) => {
    const [message, setMessage] = useState("");

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            sendMessage(message)
        }
    };

    useEffect(() => {
        window.addEventListener("onkeypress", handleEnter);
        return () => {
            window.removeEventListener("onkeypress", handleEnter);
        }
    }, [message]);

    return <Grid xs="9" item>
        <Grid item>
            <StyledDiv>
                Messages
            </StyledDiv>
        </Grid>

        <Grid item>
            <StyledTextarea name="" id="" cols="30" rows="10"  onChange={(e) => setMessage(e.target.value)}/>
        </Grid>
    </Grid>
};

