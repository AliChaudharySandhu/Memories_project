import { CREATE, UPDATE, FETCH_POSTS_BY_QUERY, DELETE, FETCH_ALL, FETCH_POST, POST_LIKE,POST_COMMENT, START_LOADING, END_LOADING } from '../constants/ActionTpes'

export const postReducer = (state = {posts: [], isLoading: true, post: []}, action) =>{
    
    if(action.type === FETCH_ALL){
        return {
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.totalPage
        };
    }
    else if(action.type === FETCH_POST){
        return {
            ...state,
            post : action.payload 
        }
    }
    else if(action.type === START_LOADING){
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === END_LOADING){
        return {
            ...state,
            isLoading: false
        }
    }
    else if(action.type === FETCH_POSTS_BY_QUERY){
        return {...state, posts: action.payload};
    }
    else if(action.type === CREATE){
        return {...state, posts: [...state.posts, action.payload]}
    }
    else if(action.type === UPDATE || action.type === POST_LIKE){
        return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)}
    }
    else if(action.type === DELETE){
         
        return {...state, posts: state.posts.filter(post => post._id !== action.payload)  }
    }
    else if (action.type === POST_COMMENT){
        return {
            ...state,
            posts: state.posts.map(post => {
                if(post._id === action.payload._id){
                    return post = action.payload
                }
                return post
            })
        }
    }
    else {
        return state
    }
}

export default postReducer 