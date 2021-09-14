import React, {useState, useRef} from 'react'
import {useDispatch} from 'react-redux'
import { Typography, TextField, Button, Grid } from '@material-ui/core'
import useStyles from './styles'
import {postComment} from '../../actions/PostActions'


const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const user = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null
    const handleClick = async() =>{
         const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(postComment(finalComment, post._id))
        await setComments(newComments)
        setComment('')
    }

    return (
     <div>
         <Grid container spacing={2}>
             <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="textPrimary">Comments</Typography>
             </Grid>
            <Grid item xs={12} sm={4} className={classes.commentsInner}>
                {comments?.map((c, i) =>{
                    const arr = c.split(':')
                    const name = arr[0];
                    const comment = arr[1]
                    return(
                    <div key={i} style={{display: 'flex', alignItems: 'baseline', padding: '4px 0'}}>
                        <Typography component='h6' variant="body2" color="secondary" >{name}:&nbsp;</Typography>
                        <Typography component='p' variant="caption" color="primary">{comment}</Typography>
                    </div>)
                })}
            </Grid>
            {user?.result.name && (

                <Grid item xs={12} sm={8}>
                    <Typography guuterBottom size="small" variant="body1" color="textSecondary">Write a Comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant='outlined'
                        label="Comment"
                        multiline
                        margin='dense'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <Button style={{marginTop: '10px'}} color='secondary' variant='contained' fullWidth disabled={!comment} onClick={handleClick}>Comment</Button>
                </Grid>
            )}
         </Grid>
     </div>
    )
}

export default CommentSection
