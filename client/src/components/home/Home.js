import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid} from '@material-ui/core'
import useStyles from './styles'
import Posts from '../Posts/Posts'
import Forms from '../Form/Forms'
import { getPosts } from '../../actions/PostActions'
import { useDispatch } from 'react-redux'



const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [postId, setPostId] = useState(null)
    const [isPostDelete, setPostDelete] = useState(false)

    useEffect(() => {
        dispatch(getPosts())

    }, [postId,dispatch])

    
    return (
        <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={4}>
                        <Grid item xs={12} sm={12} md={7}>
                            <Posts setPostDelete={setPostDelete} setPostId={setPostId} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <Forms isPostDelete={isPostDelete} postId={postId} setPostId={setPostId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home
