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
        const newPost = await new PostMessage(post).save()
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
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post , _id}, {new: true})
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

    try {
        const post = await PostMessage.findById(id);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new : true})
        res.send(updatedPost)
    } catch (error) {
        console.log(error.message)
    }

}