import React, { useState } from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import Icon from './Icon'
import {useDispatch} from 'react-redux'

import GoogleLogin from 'react-google-login'

import useStyles from './styles'
import { useHistory } from 'react-router-dom';
import { signIn, signUp } from '../../actions/Auth';


const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [isSignup, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const initialFormState = {firstname: '', lastname: '', email: '', password: '', confirmPassword: ''}

    const [formData, setFormData] = useState(initialFormState)

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(isSignup === true){
            dispatch(signUp(formData, history))
        }else {
            dispatch(signIn(formData, history))
        }
    }
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    const switchMode = () =>{
        setIsSignUp(prevIsSignUp => !prevIsSignUp)
        setShowPassword(false)
    }
    const handleShowPaswrd =() => setShowPassword((prevShowpassword) => !prevShowpassword);
    const googleSuccess = async (res) =>{
        const result= res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result, token}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    };
    const googleFailure =(error) =>{
        console.log(error)
    }
    return (
        <Container component="div" maxWidth="xs">

            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={(e) =>handleSubmit(e)}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstname' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastname' label='Last Name' handleChange={handleChange}  half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Email Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPaswrd={handleShowPaswrd}/>
                        {isSignup && <Input name="confirmPassword" type= "password" label="Repeat Password" handleChange={handleChange}/>}
                    </Grid>
                    <Button variant="contained" fullWidth type="submit" color="primary" className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
                    <GoogleLogin 
                        clientId="560190411202-77fjtummdtk8uca24jhrs97aduoieol8.apps.googleusercontent.com"
                        render={(renderProps) =>(
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    >

                    </GoogleLogin>
                    <Grid container justifyContent="flex-end">
                        <Button flex="end" size="small" onClick={switchMode} variant="text" color="primary" >{isSignup ? "ALREADY USER? SIGN IN" : "DONT HAVE AN ACCOUNT? SIGN UP"}</Button>
                    </Grid>
                </form>
            </Paper>


        </Container>
    )
}

export default Auth
