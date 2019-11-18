import React, {useEffect} from 'react';
import {Profile} from "../components/Profile.jsx";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {compose} from "redux";
import {logout} from "../redux/actionCreators/userActionCreators";
import {addUser} from "./../redux/middleWares/userThunks";
import {Redirect} from 'react-router-dom';

const ProfileContainer = ({logout,addUser,userId,...props}) => {
    // useEffect(()=> {
    //     getDialogs();
    // },[]);
    debugger
    useEffect(()=> {
        if(userId != null){
            debugger
            addUser("stonebo0sh@gmail.com",userId);
        }
    },[userId]);
    const logoutWithToken = () => {
        debugger
        localStorage.clear();
        logout();
    };
    return <Profile {...props} logout={logoutWithToken}/>
};
const mapStateToProps = state => {
    debugger
    return {
        userId: state.user.data._id,
        dialogs:state.user.data.dialogs
    }
};
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {logout,addUser})
)(ProfileContainer);