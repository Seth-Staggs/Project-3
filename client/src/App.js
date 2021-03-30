import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';


import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import NavBar from './components/Navbar';
import Home from './pagepaths/Home';
import Login from './pagepaths/Login';
import Register from './pagepaths/Register';
import SinglePost from './pagepaths/SinglePost';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <NavBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/Login" component={Login} />
          <AuthRoute exact path="/Register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
