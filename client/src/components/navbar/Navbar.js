import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Grid, Typography} from '@material-ui/core'
import memories from './../../images/memories-Logo.png'
import memoriesText from './../../images/memories-Text.png'
import useStyles from './styles'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import jwt from 'jsonwebtoken'

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [user, setUser] =useState(JSON.parse(localStorage.getItem('profile')))
    const logOut = () =>{
        dispatch({type: 'LOGOUT'})
        history.push('/')
        setUser(null)
    }

    useEffect(() =>{
        const token = user?.token;
        
        if(token){
            const decodedToken = jwt.decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logOut()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    // console.log(user)
    return (

            <AppBar className={classes.appBar} position="static" color="inherit">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Link className={classes.brandContainer} to="/">
                        
                            <img src={memoriesText} alt="Memories Sweet Memories" height="45" />
                            <img className={classes.image} src={memories} alt="memories" height="40" />
                        </Link>
                    </Grid>
                    <Grid item>

                        <Toolbar className={classes.toolbar}>
                            {user ? (
                                <div className={classes.profile}>
                                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                                    <Typography className={classes.username} variant="h6">{user.result.name}</Typography>
                                    <Button onClick={logOut} className={classes.logout} variant="contained" color="secondary" >Logout</Button>
                                </div>
                            ): (
                                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                            )
                            }
                        </Toolbar>
                    </Grid>
                </Grid>

            </AppBar>
    )
}

export default Navbar
