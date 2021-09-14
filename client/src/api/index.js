import axios from 'axios'
// https://memories-project570.herokuapp.com/posts

const API = axios.create({baseURL : 'http://localhost:5000'})

API.interceptors.request.use(req => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostDetail = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post('/posts' , newPost)

export const editPost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likepost`)

export const postComment = (comment, id) => API.post(`/posts/${id}/commentpost` , {comment})

//------------------- User Routes ----------------

export const signIn = (formData) => API.post('/user/signin' , formData)

export const signUp = (formData) => API.post('/user/signup' , formData)

//---------------------- Search tags ------------------

export const fetchPostsByQuery = (q) => API.get(`/posts/search?q=${q.search || 'none'}&tags=${q.tags}`)
