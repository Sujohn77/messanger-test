import React from 'react';
import {Profile} from "../components/Profile.jsx";
import withAuthRedirect from "../hoc/withAuthRedirect";

const ProfileContainer = (props) => {
    return <Profile {...props}/>
};

export default withAuthRedirect(ProfileContainer);