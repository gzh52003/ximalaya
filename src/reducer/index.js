import {combineReducers} from "redux";

import userReducer from './userReducer'

let routers = combineReducers({
    user : userReducer
})

export default routers;