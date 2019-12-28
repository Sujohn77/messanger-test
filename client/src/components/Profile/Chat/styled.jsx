import styled from "styled-components";

export const MyMessage = styled.div`
    justify-content: flex-end
    width:auto!important;
    padding-right:1rem;
    div{
        background:#fff
        width: fit-content
        padding: 12px
        border-radius: 13px
    }
`;
export const FriendMessage = styled.div`
    justify-content: flex-start;
    width:auto!important;
    padding-left:1rem;
    div{
        background: yellow
        width: fit-content
        padding: 12px
        border-radius: 13px
    }
`;

export const StyledDiv = styled.div`
    width:100%
    overflow:auto
    > div{
        width:100%
        height:50px;
        margin:.25rem 0
        display: flex
    }
`;