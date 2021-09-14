import express from 'express'
import {getPostsBySearch, getPosts, getPostDetail, createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/post.js';
import auth from '../middlewares/auth.js'

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPostDetail);
router.post('/', auth, createPost);
router.delete('/:id', auth, deletePost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likepost', auth, likePost)
router.post('/:id/commentpost', auth, commentPost)





export default router