import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import {useSelector} from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

const Posts = ({ setPostId }) => {

    const posts = useSelector((state) => state.posts)
    const classes = useStyles();

    return (
        !posts ? (<div>There is no post. Create your Memories!</div>)
        : posts && !posts[0] ? <CircularProgress/>   
        :  (
            <Grid container className={classes.container} alignItems="stretch" spacing={4}>
                {posts.map((post) =>(
                    <Grid item key={post._id} xs={12} sm={6} >
                        <Post post={post} setPostId={setPostId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts
