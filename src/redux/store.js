import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';

import {appReducer} from "./app-reducer";
import {userReducer} from "./user-reducer";

let reducers = combineReducers({
    app:appReducer,
    form:formReducer,
    // detailForm:formReducer,
    user:userReducer
});

let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;

export default store;