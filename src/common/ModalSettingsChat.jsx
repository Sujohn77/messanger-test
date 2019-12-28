import React  from "react";
import {StyledModal} from "./styled-components/StyledModal";
import classnames from "classnames";
import Button from "@material-ui/core/Button";

import "./../assets/css/modal.scss"



export const ModalSettingsChat = ({addUserToGroup,onSubmit,setShowGroupSettings,users,addedUsers,...props}) => {
    const checkActiveUser = (user) => {
        if(addedUsers.length > 0){
            return addedUsers.includes(user);
        }
    }
    const usersElements = users && users.map((user) => <div className={classnames("user-item",checkActiveUser(user) && "user-item-active")} title={user.email} onClick={()=>addUserToGroup(user)}>{user.fullName}</div>)
    
    return (
        <StyledModal {...props} class="modal-window">
            <div>
                {usersElements}
                <Button type="submit" onClick={onSubmit}>Add</Button>
                <Button onClick={()=>setShowGroupSettings(false)} type="close" className="close-btn">X</Button>
            </div>
        </StyledModal>)
}
