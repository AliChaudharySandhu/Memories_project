import React, {useState, useEffect} from 'react'
import useStyles from './styles'
import{ TextField, Typography, Button, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, editPost } from '../../actions/PostActions'

const Forms = ({ postId, setPostId }) => {
    const classes = useStyles();
    const [error, setError] = useState('')
    const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''})

    const dispatch = useDispatch()
    const post = useSelector(state => postId ? state.posts.find((post) => post._id === postId) : null)

    useEffect(() => {
       post && setPostData(post)
    }, [post])

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(postData.creator && postData.title && postData.message && postData.tags){

            if(postId) {

                dispatch(editPost(postId, postData));
            }else if(!postId){
            
                dispatch(createPost(postData));
            }
            
            setPostId(null)
            clear()
            setError('')
        }else {
            
            setError('Fields are missing for the memory* ')
        }
        
        
    }
    const clear = () =>{
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''});
        setError('')
    }

    return (
        <Paper className={classes.papers}>
            <form className={`${classes.root} ${classes.form}`}
             autoComplete="off"
             noValidate
             onSubmit={(e) =>handleSubmit(e)}
            >
                {console.log(error)}
                <Typography variant="h6">{postId ? 'Editing' : 'Creating'} A Memory</Typography>
                <TextField name="creator" required variant="outlined" label="Creator"  fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value})}
                />
                <TextField name="title" required variant="outlined" label="Title"  fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <TextField name="message" required variant="outlined" label="Message"  fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}
                />
                <TextField name="tags" required variant="outlined" label="Tags"  fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                />
                <Typography className={classes.error} component="p" color="secondary">{error}</Typography>
                <div className={classes.fileInput}>
                    <FileBase type="file"
                     multiple={false}
                     onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />

                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>

            </form>
        </Paper>
    )
}

export default Forms
