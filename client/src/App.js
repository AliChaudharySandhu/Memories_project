import './styles.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import memories from './images/memories.png'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Forms';
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getPosts } from './actions/PostActions.js';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())

    }, [dispatch])

    const classes = useStyles();
    return ( 
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;