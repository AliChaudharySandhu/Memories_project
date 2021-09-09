import express from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/post.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);
router.patch('/:id/likepost', likePost)




export default router