import * as api from '../api/index'
import { CREATE, UPDATE, DELETE, FETCH_ALL, POST_LIKE } from '../constants/ActionTpes'

export const getPosts = () =>async dispatch =>{

    try {
        const {data} = await api.fetchPosts()

        dispatch({type: FETCH_ALL, payload: data})

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
        const {data} = await api.deletePost(id)
        dispatch({type: DELETE, payload: data})
        
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async dispatch =>{
    try {
        const {data} = await api.likePost(id)

        dispatch({type: POST_LIKE, payload: data})

    } catch (error) {
        console.log(error)
    }
}