// LIBRARIES
import React from "react";
import { connect } from "react-redux";
// COMPONENTS
import {Sidebar} from "./../components/Profile/Sidebar.jsx"
// MIDDLEWARES
import { addFriend, searchUsers} from "./../redux/middleWares/profile";
// SELECTORS
import { getFilteredSearchUsers} from "./../redux/selectors/profile-selectors";

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
export const SidebarContainer = connect(mapStateToProps, { addFriend, searchUsers })(Container)