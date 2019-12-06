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

const CreateGroup = ({chats, createGroup,addMembers, showCreateGroup,setShowGroupSettings, showSettingsGroup, setShowGroupCreate, users,activeChat }) => {
    const [addedUsers, setAddedUsers] = useState([]);
    
    const closeModal = () => {
        stopSubmit("createGroup");
        setShowGroupCreate(false);
    }

    const addMembersToChat = () => {
        debugger
        if (addedUsers.length > 0 ) {
            addMembers(chats[chats.length-1]._id,addedUsers)
        }
    }

    const createNewGroup =(values) => {
        if(values && values.createGroup){
           createGroup(values.createGroup);
        }
    }

    const addUserToGroup = (user) => {
        debugger
        if(addedUsers.includes(user)){
            const newAddedUsers = addedUsers.filter((item)=>item !== user);
            setAddedUsers(newAddedUsers,activeChat._id);
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
        chats: state.profilePage.chats
    }
}

export const CreateGroupContainer = connect(mapStateToProps, {createGroup,addMembers, setShowGroupSettings })(CreateGroup);