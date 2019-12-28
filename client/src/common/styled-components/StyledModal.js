import styled from "styled-components";

export const StyledModal = styled.div`
    position: fixed;
    background-color: rgba(255, 255, 255, 0.25);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity:${props => props.open ? "1" : "0"};
    z-index: 999;
    pointer-events: ${props => props.open ? "auto" : "none"};;
    transition: all 0.3s;
    &:target {
    visibility: visible;
    opacity: 1;
    }
    &>form {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: #ffffff;
        &>.close-btn{
            position: absolute;
            right: 0;
            top: 0;
        }
    }
    .user-item {
        height: 30px;
        display: flex;
        align-items: center;
        padding: 10px;
        &:hover{
            background:lightgrey;
            transition:.3s all
        }
    }
    .user-item-active {
        background:#5682a3;
    }
    &>div:first-child {
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2em;
        background: #ffffff;
            &>.close-btn{
                position: absolute;
                right: 0;
                top: 0;
            }
        }
`