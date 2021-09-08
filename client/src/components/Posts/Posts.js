import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'

const Posts = () => {
    const posts = useSelector((state) => state.posts)

    const classes = useStyles();

    console.log(posts)

    return (
        <div>
            <Post />
        </div>
    )
}

export default Posts
