// LIBRARIES
import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
// COMPONENTS
import {GuestLayout} from "./Layouts/GuestLayout.jsx";
import ProfileContainer from "./containers/ProfileContainer.jsx";
import RegisterContainer from "./containers/RegisterContainer.jsx";
import {connect} from 'react-redux';
import {authThunk} from "./redux/middleWares/userThunks";

import "./App.scss"

class App extends Component {
    componentDidMount() {
        this.props.authThunk(); // CHECK ON AUTHORISING
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" render={() => <GuestLayout/>}/>
                    <Route path="/register" render={() => <GuestLayout children={<RegisterContainer/>}/>}/>
                    <Route path="/profile" render={() => <ProfileContainer/>}/>
                    <Route render={() => <Redirect to="/login"/>}/>
                </Switch>
            </Router>)
    }
}

export default connect(null, {authThunk})(App);
