import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import { AuthProvider } from './context/auth';
import AuthRoute from  './util/AuthRoute';

import NavBar from './components/Navbar';
import Home from './pagepaths/Home';
import Login from './pagepaths/Login';
import Register from './pagepaths/Register';
import Post from './pagepaths/Post'


function App() {
  return (
    <AuthProvider>
      <Router>
      <Container>
      <NavBar/>
      <Route exact path="/" component={Home}/>
      <AuthRoute exact path="/Login" component={Login}/>
      <AuthRoute exact path="/Register" component={Register}/>
      <Route exact path="/posts/:postId" component={Post}/>
      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
