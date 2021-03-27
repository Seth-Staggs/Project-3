import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import NavBar from './Components/Navbar';
import Home from './pagepaths/Home';
import Login from './pagepaths/Login';
import Register from './pagepaths/Register';


function App() {
  return (
    <Router>
      <Container>
      <NavBar/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Register" component={Register}/>
      </Container>
    </Router>
  );
}

export default App;
