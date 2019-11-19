import React, {useEffect} from 'react';
import {Profile} from "../components/Profile/Profile.jsx";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {compose} from "redux";
import {logout} from "../redux/actionCreators/loginActionCreators";
import {addFriend,searchUsers} from "./../redux/middleWares/userThunks";
import {setAuth} from "../redux/actionCreators/authActionCreators";

const ProfileContainer = ({logout,addUser,userId,searchUsers,setAuth,...props}) => {
    useEffect(()=> {
        addFriend("stonebo0sh@gmail.com","Huan");
    },[]);

    const handleSearch = (e) => {
        searchUsers(e.target.value);
    };

    const logoutWithToken = () => {
        localStorage.clear();

        logout();
        setAuth(false);
    };
    return <Profile {...props} logout={logoutWithToken} handleSearch={handleSearch}/>
};
const mapStateToProps = state => {
    debugger
    return {
        dialogs:state.profilePage.dialogs
    }
};
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {logout,addFriend,searchUsers,setAuth})
)(ProfileContainer);