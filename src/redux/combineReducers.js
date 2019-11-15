import {appReducer} from "./reducers/app-reducer";
import {userReducer} from "./reducers/user-reducer";
import {reducer as formReducer} from 'redux-form';
import {combineReducers} from "redux";

export const reducers = combineReducers({
    app: appReducer,
    form: formReducer,
    user: userReducer
});