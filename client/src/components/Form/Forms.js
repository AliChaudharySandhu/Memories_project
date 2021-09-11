import React, {useState, useEffect} from 'react'
import useStyles from './styles'
import{ TextField, Typography, Button, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, editPost } from '../../actions/PostActions'

const Forms = ({ postId, setPostId, isPostDelete }) => {
    const classes = useStyles();
    const [error, setError] = useState('')
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''})

    const dispatch = useDispatch()
    const post = useSelector(state => postId ? state.posts.find((post) => post._id === postId) : null)
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
       post && setPostData(post)
    }, [post])

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(postData.title && postData.message && postData.tags){

            if(postId) {

                dispatch(editPost(postId, {...postData, name: user?.result?.name}));
            }else if(!postId){
            
                dispatch(createPost({...postData, name: user?.result?.name}));
            }
            
            setPostId(null)
            clear()
            setError('')
        }else {
            
            setError('Fields are missing for the memory* ')
        }
        
        
    }
    const clear = () =>{
        setPostData({ title: '', message: '', tags: '', selectedFile: ''});
        setError('')
    }

    // isPostDelete && clear()
    
    if(!user?.result){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center" >
                    Please sign in to create your own memories and like other people memories!
                </Typography>
            </Paper>
        )
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
                <Button type="submit" variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>

            </form>
        </Paper>
    )
}

export default Forms
