import {reducer as formReducer} from 'redux-form';
import {combineReducers} from "redux";

import {appReducer} from "./reducers/app-reducer";
import {registerReducer} from "./reducers/register-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import {loginReducer} from "./reducers/login-reducer";
import {authReducer} from "./reducers/auth-reducer";

export const reducers = combineReducers({
    app: appReducer,
    form: formReducer,
    registerPage: registerReducer,
    profilePage: profileReducer,
    loginPage: loginReducer,
    auth: authReducer
});