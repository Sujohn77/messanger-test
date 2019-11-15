import React from 'react';
import {Profile} from "../components/Profile.jsx";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {compose} from "redux";
import {logout} from "../redux/actionCreators/userActionCreators";

const ProfileContainer = ({logout,...props}) => {
    const logoutWithToken = () => {
        localStorage.clear();
        logout();
    };
    return <Profile {...props} logout={logoutWithToken}/>
};

export default compose(
    withAuthRedirect,
    connect(null, {logout})
)(ProfileContainer);