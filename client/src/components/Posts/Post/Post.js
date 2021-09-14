import React, {useEffect} from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, ButtonBase } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import Zoom from '@material-ui/core/Zoom';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import {deletePost, likePost} from '../../../actions/PostActions'


const Post = ({ post, setPostId, setPostDelete }) => {

    const user = localStorage.getItem('profile')? JSON.parse(localStorage.getItem('profile')) : null;

    useEffect(() =>{
        
    },[post])

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory() 

    const openPost = () =>{
        history.push(`/posts/${post._id}`)
    }

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;Like</>;
      };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.baseButton} onClick={openPost}>
                <CardMedia  className={classes.media} component="div" image={post.selectedFile} title={post.title} />
            </ButtonBase>
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {user && (user.result.googleId === post.creator || user.result._id === post.creator) &&(
                    <div className={classes.overlay2}>
                        <Button style={{color: 'white'}} size="small" onClick={() => setPostId(post._id)}>
                            <Tooltip TransitionComponent={Zoom} title="Edit">
                                <MoreHorizIcon fontSize="medium" />
                            </Tooltip>
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color='textSecondary'>{post?.tags?.map(tag => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom >{post.title}</Typography>
                <CardContent className={classes.cardContent}>
                    <Typography variant="body2" color='textSecondary' component="p" >{post.message}</Typography>
                </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {user && (user.result.googleId === post.creator || user.result._id === post.creator) &&(

                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small"/>
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card >
    )
}

export default Post
