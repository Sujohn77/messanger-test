// LIBRARIES
import React, {Component} from 'react'
import { Route , BrowserRouter as Router} from 'react-router-dom';
import { connect } from "react-redux"

import {LoginLayout} from "./Layouts/LoginLoyout.jsx";
import {ProfileContainer} from "./containers/ProfileContainer.jsx";
import {setInitialize} from "./redux/app-reducer.jsx";

// COMPONENT
class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" render={() => <LoginLayout/>}/>
                <Route path="/login" render={() => <LoginLayout/>}/>
                <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
            </Router>)
    }
}
let mapStateToProps = (state) =>{
    return{
        initialized:state.app.initialized
    }
};
export default App =  connect(mapStateToProps,{setInitialize})(App)
