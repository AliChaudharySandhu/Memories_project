import express from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/post.js';
import auth from '../middlewares/auth.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.delete('/:id', auth, deletePost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likepost', auth, likePost)




export default router