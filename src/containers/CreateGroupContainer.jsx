import React, { useState } from "react";
import { stopSubmit } from "redux-form";
import { connect } from "react-redux";
// REDUX
import { setShowGroupSettings} from "./../redux/actionCreators/profileActionCreators";
import { addMembers, createGroup } from "./../redux/middleWares/userThunks";
import {getChatNamesUser} from "./../redux/selectors/profile-selectors";
// COMPONENTS
import { ModalCreateGroup } from "../common/ModalCreateGroup.jsx";
import { ModalSettingsChat } from "../common/ModalSettingsChat.jsx";

const CreateGroup = ({chatNames, createGroup,addMembers, showCreateGroup,setShowGroupSettings, showSettingsGroup, setShowGroupCreate, users,chat }) => {

    const [addedUsers, setAddedUsers] = useState([]);
    const [groupName, setGroupName] = useState("");
    const closeModal = () => {
        stopSubmit("createGroup");
        setShowGroupCreate(false);
    }

    const addMembersToChat = () => {
        debugger
        let actualGroupName;
        if(chatNames.includes(groupName) && groupName !== ""){
            // SET NAME OF NEW CREATED CHAT
            actualGroupName = groupName
        }
        else{
            // SET NAME OF ACTIVE CHAT
            actualGroupName = chat.name
        }

        if (addedUsers.length > 0 ) {
            addMembers(actualGroupName,addedUsers)
        }
    }

    const createNewGroup =(values) => {
        
        if(values && values.createGroup){
           setGroupName(values.createGroup);
           createGroup(values.createGroup);
        }
    }

    const addUserToGroup = (user) => {
        
        if(addedUsers.includes(user)){
            const newAddedUsers = addedUsers.filter((item)=>item !== user);
            setAddedUsers(newAddedUsers);
        }
        else{
            const newAddedUsers = [...addedUsers,user];
            setAddedUsers(newAddedUsers);
          
        }
        
    }

    return <React.Fragment>
        {showCreateGroup && <ModalCreateGroup open={true} closeModal={closeModal} onSubmit={createNewGroup} />}
        {showSettingsGroup && <ModalSettingsChat  users={users}
                                addedUsers={addedUsers}
                                addUserToGroup={addUserToGroup}
                                open={true}
                                setShowGroupSettings={setShowGroupSettings}
                                onSubmit={addMembersToChat} />}
    </React.Fragment>
}

const mapStateToProps = (state) => {
    
    return {
        users: state.profilePage.friendsList,
        showSettingsGroup: state.profilePage.showSettingsGroup,
        showCreateGroup: state.profilePage.showCreateGroup,
        chatNames: getChatNamesUser(state)
    }
}

export const CreateGroupContainer = connect(mapStateToProps, {createGroup,addMembers, setShowGroupSettings })(CreateGroup);