import React from "react";
import { connect } from "react-redux";

import { logout } from "./../redux/actionCreators/loginActionCreators";
import { addFriend, searchUsers} from "./../redux/middleWares/userThunks";
import { getFilteredSearchUsers} from "./../redux/selectors/profile-selectors";

import {Sidebar} from "./../components/Profile/Sidebar.jsx"

const Container = ({setActiveChat, activeChat, searchItems, openSettings, handleSearch, ...props}) => {
    return <Sidebar {...props}
                    setActiveChat={setActiveChat}
                    activeChat={activeChat}
                    searchItems={searchItems}
                    openSettings={openSettings}
                    handleSearch={handleSearch} />
};

const mapStateToProps = state => {
    return {
        searchItems: getFilteredSearchUsers(state),
        chats: state.profilePage.chats,
    }
};
export const SidebarContainer = connect(mapStateToProps, {logout, addFriend, searchUsers })(Container)