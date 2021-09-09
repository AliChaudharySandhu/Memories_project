import './styles.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import memories from './images/memories.png'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Forms';
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getPosts } from './actions/PostActions.js';

function App() {
    const dispatch = useDispatch();
    const [postId, setPostId] = useState(null)

    useEffect(() => {
        dispatch(getPosts())

    }, [postId,dispatch])

    const classes = useStyles();
    return ( 
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h3" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={4}>
                        <Grid item xs={12} sm={12} md={7}>
                            <Posts setPostId={setPostId} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <Form postId={postId} setPostId={setPostId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;