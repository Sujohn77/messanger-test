import styled from "styled-components";

export const Row = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-around;
    width: 210px;
    cursor:pointer;
    font-family: sans-serif;
    font-weight: 700;
`;

export const Main = styled.div`
    width: 304px;
    height:300px;
    background:#fff;
    box-shadow:0 0 10px rgba(0,0,0,0.5);
    position:absolute;
    >div{
        width:inherit;
        flex-direction: column;
        align-items: flex-end;
        display: flex;
        &:hover{
            background-color:lightgrey;
            
        }
    }
`;

