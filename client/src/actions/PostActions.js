import * as api from '../api/index'
import { CREATE, UPDATE, DELETE, FETCH_ALL,FETCH_POST, POST_LIKE, POST_COMMENT, FETCH_POSTS_BY_QUERY, END_LOADING, START_LOADING} from '../constants/ActionTpes'

export const getPosts = (page) =>async dispatch =>{

    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page)

        dispatch({type: FETCH_ALL, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)    
    }

}
export const getPost = (id) =>async dispatch =>{

    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPostDetail(id)
        dispatch({type: FETCH_POST, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)    
    }

}

export const getPostsBySearch = (searchQuery) => async dispatch =>{
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPostsByQuery(searchQuery) 

        dispatch({type: FETCH_POSTS_BY_QUERY, payload: data})
        dispatch({type: END_LOADING})
        
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async dispatch =>{
    try {
        const {data} = await api.createPost(post)
        dispatch({type: CREATE, payload: data})
        
    } catch (error) {
        console.log(error + "there is an error in Create post Action Api")   
    }
}

export const editPost = (id, post) => async dispatch =>{
    try {
        const {data} = await api.editPost(id, post)
        dispatch({type: UPDATE, payload: data})

    } catch (error) {
        console.log(error)
    }
}
export const deletePost = (id) => async dispatch =>{

    try {
        await api.deletePost(id)
        dispatch({type: DELETE, payload: id})
        
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async dispatch =>{
    try {
        const {data} = await api.likePost(id)
        console.log(data)
        dispatch({type: POST_LIKE, payload: data})

    } catch (error) {
        console.log(error)
    }
}
export const postComment = (comment, id) => async dispatch =>{
    console.log('comment+id' + comment, id)
    try {
        const {data} = await api.postComment(comment, id)

        dispatch({type: POST_COMMENT, payload: data})
        
        return data.comments
    } catch (error) {
        console.log(error)
    }
}