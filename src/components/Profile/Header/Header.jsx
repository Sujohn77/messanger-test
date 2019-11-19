import React from "react";
import styled from "styled-components";

import {Burger} from "./Burger";

const StyledHeader = styled.h2`
    margin: 1px 4rem 0
`;

export const Header = ({openSettings,setOpenSettings}) => {
    return <>
        <Burger open={openSettings} setOpen={setOpenSettings}/>

        <StyledHeader>Next Messenger</StyledHeader>
    </>
};

