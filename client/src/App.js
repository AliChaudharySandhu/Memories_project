import React, { Component } from 'react'
import { Container,} from '@material-ui/core'
import Navbar from './components/navbar/Navbar.js';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/home/Home.js';
import Auth from './components/auth/Auth.js';
import PostDetails from './components/postDetail/PostDetails.js';
import NotFound from './components/NotFound.js';

function App() {
    const user = localStorage.getItem('profile') ? JSON.stringify(localStorage.getItem('profile')) : null;

    const PrivateRoute = ({Component : component, ...rest}) =>(
        <Route 
        {...rest}
        render={() => user ? <Redirect to="/posts"/> : <Component />  }
        />
    )

    return ( 
    <BrowserRouter>
        <Container maxWidth='xl'>
            <Navbar />
            <Switch>
                <Route path="/" exact component={() => <Redirect to="/posts"/>}/>
                <Route path="/posts" exact component={Home}/>
                <Route path="/posts/search" exact component={Home}/>
                <Route path="/posts/:id" exact component={PostDetails}/>
                <PrivateRoute path="/auth" exact component={Auth}/>
                <Route component={NotFound}/>
            </Switch>
        </Container>
    </BrowserRouter>        
    );
}

export default App;