import PostMessage from '../models/postMessages.js';
import mongoose  from 'mongoose';

export const getPosts = async (req, res) =>{
            const {page} = req.query
    try{
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({}); 

        const posts = await PostMessage.find().sort({_id : -1}).limit(LIMIT).skip(startIndex)

        res.status(200).json({data: posts, currentPage: Number(page), totalPage: Math.ceil(total/LIMIT)})

    } catch (error){
        res.status(400).json({message : error.message})
    }
}
export const getPostDetail = async(req, res) =>{
    const {id} = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id')

    try {
        const post = await PostMessage.findById(id)
        res.json(post)
    } catch (error) {
        console.log(error)
    }
}
export const getPostsBySearch = async(req, res) =>{
        const {q , tags} = req.query;
        const title = new RegExp(q, 'i')
    try {
        const posts =await PostMessage.find({$or: [ {title}, {tags: {$in: tags.split(',')}}]})
        
        res.json(posts)
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (req, res) =>{
    const post = req.body;
    console.log(req.userId)
    
    try{ 
        const newPost = await new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()}).save()
        res.status(201).json(newPost)

    }catch (error){
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) =>{
    const {id : _id} = req.params;
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id')

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, createdAt: new Date().toISOString(), _id}, {new: true})
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deletePost = async(req, res) =>{
    const {id} = req.params;

    try {
        
       const deletedPost = await PostMessage.findByIdAndDelete(id);
        res.send(deletedPost)
    } catch (error) {
        console.log(error.message)
    }
}
export const likePost = async(req,res) =>{
    const {id} = req.params

    if(!req.userId) return res.send('User is not authenticated!')

    try {
        const post = await PostMessage.findById(id);
        const index = post.likes.findIndex(id => id === String(req.userId))
        
        if(index === -1){
            post.likes.push(req.userId)
        }else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, {...post, likes: post.likes, id}, {new : true})
        res.send(updatedPost)
    } catch (error) {
        console.log(error.message)
    }

}

export const commentPost = async(req, res) =>{
    const {id: _id} = req.params
    const {comment} = req.body

    try{
        const post = await PostMessage.findById(_id);
        post.comments.push(comment)
        const newPost = await PostMessage.findByIdAndUpdate(_id, post, {new : true})
        res.json(newPost)
    }
    catch(error) {
        console.log(error)
    }
}