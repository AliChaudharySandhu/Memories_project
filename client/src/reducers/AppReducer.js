import { combineReducers } from "redux";
import PostReducer from './PostReducers'

export default combineReducers ({
    posts : PostReducer,
})