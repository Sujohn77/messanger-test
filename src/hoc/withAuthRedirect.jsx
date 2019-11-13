import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

let mapStateToProps = (state) => ({
    isAuth:state.user.Auth
});

const withAuthRedirect = (Component) => {
    class RedirectComponent extends PureComponent{
        render(){

            // NOT LOGGED TO LOGIN ELSE TO COMPONENT
            if(!this.props.isAuth) return <Redirect to="/login"/>
            return <Component {...this.props}/>
        }
    }


    let ConnectRedirectComponent =  connect(mapStateToProps)(RedirectComponent);

    return ConnectRedirectComponent;
};

export default  withAuthRedirect;