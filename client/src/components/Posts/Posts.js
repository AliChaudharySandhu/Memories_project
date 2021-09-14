import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import {useSelector} from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

const Posts = ({ setPostId, setPostDelete }) => {

    const {posts, isLoading } = useSelector((state) => state.posts)
    const classes = useStyles();
    
    // There is no post. Create your Memories!

    return (
        isLoading ?(<div className={classes.loading}><CircularProgress color="secondary" size={70}/></div> )   
        :  (
            <Grid container className={classes.container} alignItems="stretch" spacing={4}>
                    {posts?.map((post) =>(
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={4} xl={3} >
                            <Post post={post} setPostId={setPostId} setPostDelete={setPostDelete}/>
                        </Grid>
                    ))}
                </Grid>
        )
    )
}

export default Posts
