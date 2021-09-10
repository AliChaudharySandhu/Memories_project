import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostReducer from './PostReducers'

export default combineReducers ({
    posts : PostReducer,
    auth: AuthReducer
})