import express from 'express';
import {signIn, signUp} from '../controllers/user.js'

//------>>Capital R for Router--------------
const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', signUp)


export default router