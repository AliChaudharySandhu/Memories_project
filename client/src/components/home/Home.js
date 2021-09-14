import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, FormControl } from '@material-ui/core'
import Chip from '@material-ui/core/Chip';
import useStyles from './styles'
import Posts from '../Posts/Posts'
import Forms from '../Form/Forms'
import { getPosts, getPostsBySearch } from '../../actions/PostActions'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import Paginate from '../pagiante/Pagination'


function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('q');


    const [postId, setPostId] = useState(null)
    const [isPostDelete, setPostDelete] = useState(false)
    const [search, setSearch] = useState('');
    const [searchTags, setSearchtags] = useState([]);
    const [tags, setTags] = useState([])


    const searchPosts = () =>{

        if(search.trim() || tags){
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))
            history.push(`/posts/search?q=${search}&tags=${tags}`)
        }else {
            history.push('/')
        }
    }

    const keyPressHandler = (e) => {

        if (e.keyCode === 13) {
            searchPosts()
        }
    }

    const generateChips = (e) => {
        e.preventDefault();

        if(searchTags.length > 0){

            tags.push(searchTags)
        }
        setSearchtags([])

    }
    const handleDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete))
    }


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={4}>
                    <Grid item xs={12} sm={6} md={8} lg={9}>
                        <Posts setPostDelete={setPostDelete} setPostId={setPostId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name='search' variant='outlined' label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={keyPressHandler}/>
                            <form onSubmit={generateChips}>
                                <TextField name='search-chip' style={{margin: '10px 0'}} variant='outlined' value={searchTags} label="Search Tags" fullWidth onChange={(e) => setSearchtags(e.target.value)} />

                                <div>
                                    {tags?.map(tag => (

                                        <Chip
                                            key={tag.name}
                                            style={{ margin: '0 4px 8px 0' }}
                                            name="search-chip"
                                            label={tag}
                                            variant="default"
                                            color="secondary"
                                            size="medium"
                                            onDelete={() =>handleDelete(tag)}
                                        />
                                    ))}
                                </div>
                            </form>
                            {console.log(search)}
                            <Button onClick={searchPosts} disabled={!(search || tags.length) ? true : false} className={classes.searchButton} variant="contained" color="primary">Search</Button>


                        </AppBar>

                        <Forms isPostDelete={isPostDelete} postId={postId} setPostId={setPostId} />
                        {(!searchQuery && !tags.length)&& (
                            <Paper elevation={6} className={classes.pagination}>
                                <Paginate page={page}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
