import React from 'react';
import {Profile} from "../components/Profile/Profile.jsx";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {compose} from "redux";
import {logout} from "../redux/actionCreators/loginActionCreators";
import {addFriend,searchUsers} from "./../redux/middleWares/userThunks";
import {setAuth} from "../redux/actionCreators/authActionCreators";
import { getFilteredSearchUsers,getLastMessage } from '../redux/selectors/profile-selectors';

const ProfileContainer = ({logout,userId,searchUsers,setAuth,addFriend,...props}) => {
    // useEffect(()=> {
    //     addFriend("stonebo0sh@gmail.com","Huan");
    // },[]);

    const handleSearch = (value) => {
        
        searchUsers(value);
    };
    
    const logoutWithToken = () => {
        localStorage.clear();

        logout();
        setAuth(false);
    };
    return <Profile {...props} addFriend={addFriend} logout={logoutWithToken} handleSearch={handleSearch}/>
};
const mapStateToProps = state => {
    return {
        searchItems: getFilteredSearchUsers(state),
        dialogs:state.profilePage.dialogs,
        lastMessage:getLastMessage(state)
    }
};
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {logout,addFriend,searchUsers,setAuth})
)(ProfileContainer);