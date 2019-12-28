import {reducer as formReducer} from 'redux-form';
import {combineReducers} from "redux";

import {appReducer} from "./reducers/app-reducer";
// import {registerReducer} from "./reducers/register-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import {userReducer} from "./reducers/user-reducer";
import {authReducer} from "./reducers/auth-reducer";
import { messagesReducer } from './reducers/messages-reducer';

export const reducers = combineReducers({
    app: appReducer,
    form: formReducer,
    // registerPage: registerReducer,
    profilePage: profileReducer,
    userData: userReducer,
    auth: authReducer,
    messages:messagesReducer
});