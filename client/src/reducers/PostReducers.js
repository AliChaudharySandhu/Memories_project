import { CREATE, UPDATE, DELETE, FETCH_ALL, POST_LIKE } from '../constants/ActionTpes'

export const postReducer = (posts = [], action) =>{

    if(action.type === FETCH_ALL){
        return action.payload;
    }
    else if(action.type === CREATE){
        return [...posts, action.payload]
    }
    else if(action.type === UPDATE || POST_LIKE){
        return posts.map(post => post._id === action.payload._id ? action.payload : post)
    }
    else if(action.type === DELETE){
         
        return posts.filter(post => post._id !== action.payload._id)  
    }
    else {
        return posts
    }
}

export default postReducer 