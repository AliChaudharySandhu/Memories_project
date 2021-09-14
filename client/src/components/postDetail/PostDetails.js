import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, Container, Grid, Card, } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom'
import useStyles from './styles'
import { getPost, getPostsBySearch } from '../../actions/PostActions'
import CommentSection from './CommentSection'

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const history = useHistory();
    const params = useParams()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    useEffect(() =>{
        if(post){
            dispatch(getPostsBySearch({search: 'none', tags: post?.tags?.join(',')}))
        }
    }, [post])

    const recommendedPosts = posts.filter(({_id}) => _id !== post._id)

    const openPost = (id) =>{
        history.push(`/posts/${id}`)
    }

    const classes = useStyles()
    if (!post) return null;
    else if (isLoading) {
        return (<div className={classes.loading}><CircularProgress color="secondary" size={70} /></div>)
    }
    return (
        <Paper className={classes.paper} elevation={6} spacing={4}>
            <Grid container className={classes.postDestailContainer} spacing={4} justifyContent='space-around'>
                

                    <Grid item md={7} sm={12}>

                        <div className={classes.section}>
                            <Typography variant="h3" component="h2">{post.title}</Typography>
                            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
                            <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                            <Typography variant="h6">Created by: {post.name}</Typography>
                            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                            <Divider style={{ margin: '20px 0' }} />
                            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                            <Divider style={{ margin: '20px 0' }} />
                            <strong>
                                <CommentSection post={post} />
                            </strong>
                            <Divider style={{ margin: '20px 0' }} />
                        </div>
                    </Grid>

                    <Grid item md={5} sm={12} >

                        <div className={classes.imageSection}>
                            <img className={classes.media} src={post.selectedFile || 'https://#'} alt={post.title} />
                        </div>
                    </Grid>
                
            </Grid>

            {recommendedPosts[0] && (
                <div className={classes.section}>
                    <Typography style={{marginLeft: '15px'}} component="h3" gutterBottom variant="h5">You might Also Like</Typography>
                    <Divider />
                    <Grid container fullWidth className={classes.recommendedPosts} spacing={4}>
                        {recommendedPosts?.map(({title, message, name, likes, selectedFile, _id}) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} style={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6" >{title}</Typography>
                                <Typography gutterBottom variant="subtitle2" >{name}</Typography>
                                <Typography gutterBottom variant="subtitle2" >{message}</Typography>
                                <Typography gutterBottom variant="subtitle1" >Likes :{likes.length}</Typography>
                                <img src={selectedFile} alt={title} width="200px"></img>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </Paper>
    )
}

export default PostDetails
