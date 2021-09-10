import React from 'react'
import { Container,} from '@material-ui/core'
import Navbar from './components/navbar/Navbar.js';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/home/Home.js';
import Auth from './components/auth/Auth.js';

function App() {

    return ( 
    <BrowserRouter>
        <Container maxWidth='lg'>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/>
            </Switch>
        </Container>
    </BrowserRouter>        
    );
}

export default App;