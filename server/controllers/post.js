import PostMessage from '../models/postMessages.js';
import mongoose  from 'mongoose';

export const getPosts = async (req, res) =>{
    try{
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error){
        res.status(400).json({message : error.message})
    }
}

export const createPost = async (req, res) =>{
    const post = req.body;
    
    try{ 
        const newPost = await new PostMessage({...post, creator: req.userid, createdAt: new Date().toISOString()}).save()
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