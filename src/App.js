// LIBRARIES
import React, {Component} from 'react'
import { Route , BrowserRouter as Router, Redirect,Switch} from 'react-router-dom';
// COMPONENTS
import {GuestLayout} from "./Layouts/GuestLayout.jsx";
import {ProfileContainer} from "./containers/ProfileContainer.jsx";
import UserForm from "./components/UserForm.jsx";


export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" render={() => <GuestLayout/>}/>
                    <Route path="/register" render={() => <GuestLayout children={<UserForm/>}/>}/>
                    <Route path="/profile" render={() => <ProfileContainer/>}/>
                    <Route render={() => <Redirect to="/login"/>}/>
                </Switch>
            </Router>)
    }
}
