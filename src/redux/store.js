import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";

import {appReducer} from "./app-reducer.jsx";

let reducers = combineReducers({
    app:appReducer
});

let store = createStore(reducers,applyMiddleware(thunkMiddleware));

export default store;